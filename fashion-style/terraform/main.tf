terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

locals {
  project_tags = {
    Project   = var.project_name
    ManagedBy = "terraform"
  }

  ami_id              = var.ami_id != "" ? var.ami_id : data.aws_ami.ubuntu_22.id
  worker_subnet_index = length(var.public_subnet_cidrs) > 1 ? 1 : 0
}

data "aws_ami" "ubuntu_22" {
  most_recent = true
  owners      = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = merge(local.project_tags, {
    Name = var.vpc_name
  })
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = merge(local.project_tags, {
    Name = "${var.project_name}-igw"
  })
}

resource "aws_subnet" "public" {
  count                   = length(var.public_subnet_cidrs)
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnet_cidrs[count.index]
  availability_zone       = var.public_subnet_azs[count.index]
  map_public_ip_on_launch = true

  tags = merge(local.project_tags, {
    Name = "${var.project_name}-public-${count.index + 1}"
  })
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  tags = merge(local.project_tags, {
    Name = "${var.project_name}-public-rt"
  })
}

resource "aws_route" "public_internet" {
  route_table_id         = aws_route_table.public.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.main.id
}

resource "aws_route_table_association" "public" {
  count          = length(aws_subnet.public)
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

resource "aws_security_group" "ayesha" {
  name        = var.security_group_name
  description = "Security group for Kubernetes nodes"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Kubernetes API Server"
    from_port   = 6443
    to_port     = 6443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Kubelet"
    from_port   = 10250
    to_port     = 10250
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "NodePort range"
    from_port   = 30000
    to_port     = 32767
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Internal node communication"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    self        = true
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(local.project_tags, {
    Name = var.security_group_name
  })
}

resource "aws_instance" "master" {
  ami                         = local.ami_id
  instance_type               = var.master_instance_type
  key_name                    = var.key_pair_name
  subnet_id                   = aws_subnet.public[0].id
  vpc_security_group_ids      = [aws_security_group.ayesha.id]
  associate_public_ip_address = true

  tags = merge(local.project_tags, {
    Name = "MasterNode"
  })
}

resource "aws_instance" "worker" {
  ami                         = local.ami_id
  instance_type               = var.worker_instance_type
  key_name                    = var.key_pair_name
  subnet_id                   = aws_subnet.public[local.worker_subnet_index].id
  vpc_security_group_ids      = [aws_security_group.ayesha.id]
  associate_public_ip_address = true

  tags = merge(local.project_tags, {
    Name = "WorkerNode"
  })
}

resource "aws_ecr_repository" "main" {
  name = var.ecr_repository_name

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = merge(local.project_tags, {
    Name = var.ecr_repository_name
  })
}

resource "aws_iam_user" "ayesha" {
  name = var.iam_user_name

  tags = merge(local.project_tags, {
    Name = var.iam_user_name
  })
}

data "aws_iam_policy_document" "ecr" {
  statement {
    sid     = "EcrAuth"
    actions = ["ecr:GetAuthorizationToken"]
    resources = ["*"]
  }

  statement {
    sid = "EcrPushPull"
    actions = [
      "ecr:BatchCheckLayerAvailability",
      "ecr:BatchGetImage",
      "ecr:CompleteLayerUpload",
      "ecr:GetDownloadUrlForLayer",
      "ecr:InitiateLayerUpload",
      "ecr:PutImage",
      "ecr:UploadLayerPart",
      "ecr:ListImages",
      "ecr:DescribeRepositories"
    ]
    resources = [aws_ecr_repository.main.arn]
  }
}

resource "aws_iam_user_policy" "ecr" {
  name   = "${var.iam_user_name}-ecr"
  user   = aws_iam_user.ayesha.name
  policy = data.aws_iam_policy_document.ecr.json
}

resource "aws_iam_access_key" "ayesha" {
  count = var.create_iam_access_key ? 1 : 0
  user  = aws_iam_user.ayesha.name
}

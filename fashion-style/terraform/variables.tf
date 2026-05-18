variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name for tagging"
  type        = string
  default     = "fashion-style"
}

variable "vpc_name" {
  description = "VPC name"
  type        = string
  default     = "AyeshaVPC"
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "Public subnet CIDR blocks"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]

  validation {
    condition     = length(var.public_subnet_cidrs) > 0
    error_message = "At least one public subnet CIDR must be provided."
  }
}

variable "public_subnet_azs" {
  description = "Availability zones for public subnets"
  type        = list(string)
  default     = ["us-east-1a", "us-east-1b"]

  validation {
    condition     = length(var.public_subnet_azs) == length(var.public_subnet_cidrs)
    error_message = "public_subnet_azs must match the number of public_subnet_cidrs."
  }
}

variable "ami_id" {
  description = "Optional fixed AMI ID. Leave empty to use the latest Ubuntu 22.04 AMI."
  type        = string
  default     = ""
}

variable "key_pair_name" {
  description = "EC2 key pair name"
  type        = string
  default     = "my-key"
}

variable "master_instance_type" {
  description = "EC2 instance type for the master node"
  type        = string
  default     = "t3.small"
}

variable "worker_instance_type" {
  description = "EC2 instance type for the worker node"
  type        = string
  default     = "t3.micro"
}

variable "security_group_name" {
  description = "Security group name"
  type        = string
  default     = "Ayesha"
}

variable "iam_user_name" {
  description = "IAM user name"
  type        = string
  default     = "AyeshaUser"
}

variable "create_iam_access_key" {
  description = "Create an access key for the IAM user"
  type        = bool
  default     = true
}

variable "ecr_repository_name" {
  description = "ECR repository name (must be lowercase)"
  type        = string
  default     = "zeenkaar"

  validation {
    condition     = can(regex("^[a-z0-9]+([._-][a-z0-9]+)*$", var.ecr_repository_name))
    error_message = "ECR repository names must be lowercase and can include . _ or - separators."
  }
}

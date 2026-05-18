output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "Public subnet IDs"
  value       = aws_subnet.public[*].id
}

output "security_group_id" {
  description = "Security group ID"
  value       = aws_security_group.ayesha.id
}

output "master_public_ip" {
  description = "Master node public IP"
  value       = aws_instance.master.public_ip
}

output "worker_public_ip" {
  description = "Worker node public IP"
  value       = aws_instance.worker.public_ip
}

output "ecr_repository_url" {
  description = "ECR repository URL"
  value       = aws_ecr_repository.main.repository_url
}

output "iam_username" {
  description = "IAM username"
  value       = aws_iam_user.ayesha.name
}

output "iam_access_key_id" {
  description = "IAM access key ID"
  value       = var.create_iam_access_key ? aws_iam_access_key.ayesha[0].id : null
}

output "iam_secret_access_key" {
  description = "IAM secret access key"
  value       = var.create_iam_access_key ? aws_iam_access_key.ayesha[0].secret : null
  sensitive   = true
}

# Fashion Style

A modern, professional fashion/e-commerce frontend built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Mobile, tablet, and desktop support
- **Modern UI**: Premium fashion brand aesthetic with smooth animations
- **Hero Section**: WovenLight-inspired hero with Three.js effects
- **Product Showcase**: Reusable product cards with hover effects
- **Dashboard**: Frontend-only store overview with statistics
- **Checkout**: Complete checkout flow UI with forms
- **Framer Motion**: Smooth animations throughout the app

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js / React Three Fiber

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fashion-style
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
fashion-style/
├── app/
│   ├── page.tsx              # Landing page
│   ├── dashboard/            # Dashboard page
│   │   └── page.tsx
│   ├── checkout/             # Checkout page
│   │   └── page.tsx
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── ui/
│   │   └── woven-light-hero.tsx  # Hero component
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── product-card.tsx
│   ├── product-list.tsx
│   ├── category-section.tsx
│   └── brand-section.tsx
├── data/
│   └── products.ts           # Sample product data
├── public/                   # Static assets
├── .env.example              # Environment variables
├── Dockerfile                # Docker configuration
├── terraform/                # Terraform IaC
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Docker

Build and run with Docker:
```bash
docker build -t fashion-style .
docker run -p 3000:3000 fashion-style
```

### Vercel

Deploy to Vercel with one click:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo/fashion-style)

## Environment Variables

Create a `.env.local` file:
```env
NEXT_PUBLIC_APP_NAME=Fashion Style
```

## Terraform (AWS Infrastructure)

This project includes a beginner-friendly Terraform setup to create:

- VPC with public subnets and internet access
- Security group for Kubernetes ports
- Two EC2 instances (MasterNode and WorkerNode)
- IAM user with ECR push/pull permissions
- ECR repository for Docker images

### Prerequisites

- Terraform 1.5+
- AWS credentials with permissions to create VPC, EC2, IAM, and ECR resources

### Setup

1. Move into the Terraform folder:
```bash
cd terraform
```

2. Copy the example tfvars file and edit values if needed:
```bash
cp terraform.tfvars.example terraform.tfvars
```

3. Initialize Terraform:
```bash
terraform init
```

4. Review the plan:
```bash
terraform plan
```

5. Apply the infrastructure:
```bash
terraform apply
```

### Notes

- The default AMI is the latest Ubuntu 22.04. Set `ami_id` to pin a specific AMI.
- ECR repository names must be lowercase, so the default is `zeenkaar`.
- The security group allows public access on Kubernetes-related ports for simplicity.
	For production, restrict SSH and API server access to your IP.
- If `create_iam_access_key` is true, the secret access key is marked sensitive in outputs.
	Keep the Terraform state file secure.

### Destroy

```bash
cd terraform
terraform destroy
```

## License

MIT License - feel free to use this project for learning or commercial purposes.
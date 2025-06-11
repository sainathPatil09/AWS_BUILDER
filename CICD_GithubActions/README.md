# CI/CD with GitHub Actions Using AWS EC2 as Self-Hosted Runner

This guide explains how to set up a CI/CD pipeline using GitHub Actions with an AWS EC2 instance as a self-hosted runner.

## Prerequisites

- AWS account with permissions to launch EC2 instances
- GitHub repository (admin access)
- SSH access to your EC2 instance

## 1. Launch an EC2 Instance

1. Go to the AWS Console and launch an EC2 instance (Amazon Linux 2 or Ubuntu recommended).
2. Open ports 22 (SSH) and any other required ports in the security group.
3. SSH into your instance:
    ```sh
    ssh -i /path/to/key.pem ec2-user@<EC2_PUBLIC_IP>
    ```

## 2. Install Required Dependencies

```sh
# For Amazon Linux 2 / Ubuntu
sudo yum update -y   # or sudo apt update && sudo apt upgrade -y
sudo yum install -y git   # or sudo apt install -y git
sudo yum install -y curl  # or sudo apt install -y curl
```

## 3. Add the Self-Hosted Runner to GitHub

1. Go to your GitHub repository.
2. Click **Settings** > **Actions** > **Runners** > **New self-hosted runner**.
3. Select the appropriate OS and architecture.
4. Follow the instructions to download and configure the runner. Example:
    ```sh
    mkdir actions-runner && cd actions-runner
    curl -o actions-runner-linux-x64-2.316.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.316.0/actions-runner-linux-x64-2.316.0.tar.gz
    tar xzf ./actions-runner-linux-x64-2.316.0.tar.gz
    ./config.sh --url https://github.com/<OWNER>/<REPO> --token <TOKEN>
    ```

## 4. Start the Runner

```sh
./run.sh
```
Or run as a service (recommended):
```sh
sudo ./svc.sh install
sudo ./svc.sh start
```

## 5. Create a GitHub Actions Workflow

Create `.github/workflows/main.yml` in your repo:

```yaml
name: CI/CD Pipeline

on:
  push:
     branches: [ main ]

jobs:
  build:
     runs-on: self-hosted
     steps:
        - uses: actions/checkout@v4
        - name: Run a script
          run: echo "Hello from EC2 self-hosted runner!"
```

## 6. Test the Setup

Push a commit to your repository. The workflow should run on your EC2 instance.

---

**References:**
- [GitHub Actions: Adding self-hosted runners](https://docs.github.com/en/actions/hosting-your-own-runners/adding-self-hosted-runners)
- [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/)

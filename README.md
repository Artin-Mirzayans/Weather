# Weather

## Demo
https://artin-mirzayans.github.io/Weather/

## Overview

This repository contains a simple Angular web application that retrieves weather data using the OpenWeather API. The backend is built using AWS Serverless technologies, including AWS Lambda, API Gateway, and DynamoDB. The entire infrastructure is provisioned and managed using Terraform, and deployment is automated through GitHub Actions workflows.

## Components

- **Angular Frontend**: The app is built with Angular & Angular Material UI.

- **AWS Serverless Backend**: The backend is implemented using AWS Lambda for serverless compute, API Gateway for managing API endpoints, and DynamoDB for storing weather data.

- **Terraform Infrastructure as Code (IaC)**: The infrastructure is defined and provisioned using Terraform, enabling reproducibility and version control of your AWS environment.

- **GitHub Actions Workflow**: Automated terraform deployment

## Prerequisites

Before getting started, make sure you have the following:

- Node.js >= 18, npm
- Terraform >= 1.6.3
- AWS account with IAM permissions for creating Lambda functions, API Gateway, and DynamoDB tables.
- [OpenWeather API Key](https://openweathermap.org/api)

## Setup

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/Artin-Mirzayans/Weather.git
    ```

2. **Install Angular Dependencies**:

    ```bash
    cd angular
    npm install
    ```

3. **Configure AWS Credentials**:

    Set up your AWS credentials on your development machine, or use a service like AWS Secrets Manager to securely store them.

4. **Terraform Configuration**:

    Navigate to the `terraform` directory and create a `secrets.tfvars` file with your OpenWeather API Key.

5. **Deploy Infrastructure**:

    Run the following commands to deploy the AWS infrastructure:

    ```bash
    cd terraform
    terraform init
    terraform plan -var-file=secrets.tfvars  
    terraform apply -var-file=secrets.tfvars  
    ```

6. **GitHub Actions Configuration**:

    Update the GitHub Actions workflow files (`.github/workflows/deploy.yml`) with your AWS and Terraform configurations.

7. **Update Angular App Config**:

    Update the Angular app configuration with the API Gateway endpoint and other necessary settings.

8. **Push Changes to GitHub**:

    Commit and push the changes to your GitHub repository.

## GitHub Actions Workflow

The GitHub Actions workflow is triggered on every push to the main branch. It performs the following steps:

1. **Checkout Code**: Checks out the latest code from the repository.

2. **Configure AWS Credentials**: Configures AWS credentials for Terraform.

3. **Run Terraform Init**: Initializes Terraform State in AWS account.
4. **Run Terraform Plan**: Plans the Terraform deployment.
5. **Run Terraform Apply**: Applies the Terraform changes if the plan is successful.

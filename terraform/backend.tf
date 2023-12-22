terraform {
  backend "s3" {
    bucket  = "am-tfstate"
    key     = "terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
  }
}

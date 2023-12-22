resource "aws_dynamodb_table" "weather_data" {
  name           = "WeatherData"
  billing_mode   = "PROVISIONED"
  read_capacity  = 5
  write_capacity = 5
  hash_key       = "Location"

  attribute {
    name = "Location"
    type = "S"
  }
}

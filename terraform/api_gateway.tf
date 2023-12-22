resource "aws_apigatewayv2_api" "weather_api" {
  name          = "WeatherAPI"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["http://localhost:4200", "https://artin-mirzayans.github.io"]
    allow_methods = ["POST"]
    allow_headers = ["content-type"]
    max_age       = 300
  }
}

resource "aws_apigatewayv2_stage" "weather_api_stage" {
  api_id = aws_apigatewayv2_api.weather_api.id
  name   = "dev" # Choose a stage name
}

resource "aws_apigatewayv2_integration" "weather_router_integration" {
  api_id             = aws_apigatewayv2_api.weather_api.id
  integration_type   = "AWS_PROXY"
  integration_method = "POST"

  integration_uri = aws_lambda_function.weather_router.invoke_arn
}

resource "aws_apigatewayv2_integration" "get_all_weather_data_integration" {
  api_id             = aws_apigatewayv2_api.weather_api.id
  integration_type   = "AWS_PROXY"
  integration_method = "POST"

  integration_uri = aws_lambda_function.get_all_weather_data.invoke_arn
}

resource "aws_apigatewayv2_integration" "delete_weather_data_integration" {
  api_id             = aws_apigatewayv2_api.weather_api.id
  integration_type   = "AWS_PROXY"
  integration_method = "POST"

  integration_uri = aws_lambda_function.delete_weather_data.invoke_arn
}

resource "aws_apigatewayv2_route" "weather_router_route" {
  api_id    = aws_apigatewayv2_api.weather_api.id
  route_key = "POST /weather-router"

  target = "integrations/${aws_apigatewayv2_integration.weather_router_integration.id}"
}

resource "aws_apigatewayv2_route" "get_all_weather_data_route" {
  api_id    = aws_apigatewayv2_api.weather_api.id
  route_key = "POST /weather"

  target = "integrations/${aws_apigatewayv2_integration.get_all_weather_data_integration.id}"


}

resource "aws_apigatewayv2_route" "delete_weather_data_route" {
  api_id    = aws_apigatewayv2_api.weather_api.id
  route_key = "POST /weather/delete"

  target = "integrations/${aws_apigatewayv2_integration.delete_weather_data_integration.id}"
}

resource "aws_lambda_permission" "api_gateway_invoke_weather_route" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.weather_router.arn
  principal     = "apigateway.amazonaws.com"

  source_arn = "arn:aws:execute-api:us-east-1:582600121363:gvmt3kjubf/dev/POST/*"
}

resource "aws_lambda_permission" "api_gateway_invoke_get_all_weather_data" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_all_weather_data.arn
  principal     = "apigateway.amazonaws.com"

  source_arn = "arn:aws:execute-api:us-east-1:582600121363:gvmt3kjubf/dev/POST/*"
}

resource "aws_lambda_permission" "api_gateway_invoke_delete_weather_data" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.delete_weather_data.arn
  principal     = "apigateway.amazonaws.com"

  source_arn = "arn:aws:execute-api:us-east-1:582600121363:gvmt3kjubf/dev/POST/*"
}


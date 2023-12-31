data "aws_iam_policy_document" "lambda_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]
    effect  = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "lambda_default_role" {
  name               = "lambda_default_role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role_policy.json
}

data "aws_iam_policy_document" "cloudwatch_logs_policy" {
  statement {
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]
    effect    = "Allow"
    resources = ["*"] # You can restrict the resources if needed
  }
}

data "aws_iam_policy_document" "dynamo_get_policy" {
  statement {
    actions   = ["dynamodb:GetItem"]
    effect    = "Allow"
    resources = ["arn:aws:dynamodb:us-east-1:582600121363:table/WeatherData"]
  }
}

data "aws_iam_policy_document" "dynamo_query_policy" {
  statement {
    actions   = ["dynamodb:Scan", "dynamodb:Query"]
    effect    = "Allow"
    resources = ["arn:aws:dynamodb:us-east-1:582600121363:table/WeatherData"]
  }
}

data "aws_iam_policy_document" "dynamo_insert_policy" {
  statement {
    actions   = ["dynamodb:PutItem"]
    effect    = "Allow"
    resources = ["arn:aws:dynamodb:us-east-1:582600121363:table/WeatherData"]
  }
}

data "aws_iam_policy_document" "invoke_insertweather_policy" {
  statement {
    actions   = ["lambda:InvokeFunction"]
    effect    = "Allow"
    resources = ["arn:aws:lambda:us-east-1:582600121363:function:InsertWeatherData"]
  }
}

data "aws_iam_policy_document" "dynamo_delete_policy" {
  statement {
    actions   = ["dynamodb:DeleteItem"]
    effect    = "Allow"
    resources = ["arn:aws:dynamodb:us-east-1:582600121363:table/WeatherData"]
  }
}

data "aws_iam_policy_document" "invoke_lambdas_policy" {
  statement {
    actions   = ["lambda:InvokeFunction"]
    effect    = "Allow"
    resources = ["arn:aws:lambda:us-east-1:582600121363:function*"]
  }
}


resource "aws_iam_role" "lambda_weather_router_role" {
  name = "lambda_weather_router"

  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role_policy.json

  inline_policy {
    name   = "CloudWatchLogsPolicy"
    policy = data.aws_iam_policy_document.cloudwatch_logs_policy.json
  }

  inline_policy {
    name   = "InvokeLambdasPolicy"
    policy = data.aws_iam_policy_document.invoke_lambdas_policy.json
  }

}

resource "aws_iam_role" "lambda_fetch_role" {
  name = "lambda_fetch_role"

  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role_policy.json

  inline_policy {
    name   = "CloudWatchLogsPolicy"
    policy = data.aws_iam_policy_document.cloudwatch_logs_policy.json
  }

  inline_policy {
    name   = "InvokeInsertWeatherPolicy"
    policy = data.aws_iam_policy_document.invoke_insertweather_policy.json
  }

}

resource "aws_iam_role" "lambda_get_role" {
  name = "lambda_get_role"

  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role_policy.json

  inline_policy {
    name   = "CloudWatchLogsPolicy"
    policy = data.aws_iam_policy_document.cloudwatch_logs_policy.json
  }

  inline_policy {
    name   = "GetWeatherPolicy"
    policy = data.aws_iam_policy_document.dynamo_get_policy.json
  }

}

resource "aws_iam_role" "lambda_query_role" {
  name = "lambda_query_role"

  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role_policy.json

  inline_policy {
    name   = "CloudWatchLogsPolicy"
    policy = data.aws_iam_policy_document.cloudwatch_logs_policy.json
  }

  inline_policy {
    name   = "QueryWeatherPolicy"
    policy = data.aws_iam_policy_document.dynamo_query_policy.json
  }
}


resource "aws_iam_role" "lambda_insert_role" {
  name = "lambda_insert_role"

  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role_policy.json

  inline_policy {
    name   = "CloudWatchLogsPolicy"
    policy = data.aws_iam_policy_document.cloudwatch_logs_policy.json
  }

  inline_policy {
    name   = "DynamoInsertPolicy"
    policy = data.aws_iam_policy_document.dynamo_insert_policy.json
  }
}

resource "aws_iam_role" "lambda_delete_role" {
  name = "lambda_delete_role"

  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role_policy.json

  inline_policy {
    name   = "CloudWatchLogsPolicy"
    policy = data.aws_iam_policy_document.cloudwatch_logs_policy.json
  }

  inline_policy {
    name   = "DynamoDeletePolicy"
    policy = data.aws_iam_policy_document.dynamo_delete_policy.json
  }
}

resource "aws_lambda_function" "weather_router" {
  function_name = "WeatherRouter"
  handler       = "index.handler"
  runtime       = "nodejs18.x"
  timeout       = 6
  filename      = "lambda_functions/WeatherRouter/function.zip"

  role = aws_iam_role.lambda_weather_router_role.arn
}

resource "aws_lambda_function" "fetch_weather_data" {
  function_name = "FetchWeatherData"
  handler       = "index.handler"
  runtime       = "nodejs18.x"
  filename      = "lambda_functions/FetchWeatherData/function.zip"

  environment {
    variables = {
      OPENWEATHER_API_KEY = var.openweather_api_key
    }
  }

  role = aws_iam_role.lambda_fetch_role.arn
}

resource "aws_lambda_function" "get_weather_data" {
  function_name = "GetWeatherData"
  handler       = "index.handler"
  runtime       = "nodejs18.x"
  filename      = "lambda_functions/GetWeatherData/function.zip"

  role = aws_iam_role.lambda_get_role.arn
}

resource "aws_lambda_function" "insert_weather_data" {
  function_name = "InsertWeatherData"
  handler       = "index.handler"
  runtime       = "nodejs18.x"
  filename      = "lambda_functions/InsertWeatherData/function.zip"

  role = aws_iam_role.lambda_insert_role.arn
}

resource "aws_lambda_function" "update_weather_data" {
  function_name = "UpdateWeatherData"
  handler       = "index.handler"
  runtime       = "nodejs18.x"
  filename      = "lambda_functions/UpdateWeatherData/function.zip"

  role = aws_iam_role.lambda_insert_role.arn
}

resource "aws_lambda_function" "get_all_weather_data" {
  function_name = "GetAllWeatherData"
  handler       = "index.handler"
  runtime       = "nodejs18.x"
  filename      = "lambda_functions/GetAllWeatherData/function.zip"

  role = aws_iam_role.lambda_query_role.arn
}

resource "aws_lambda_function" "delete_weather_data" {
  function_name = "DeleteWeatherData"
  handler       = "index.handler"
  runtime       = "nodejs18.x"
  filename      = "lambda_functions/DeleteWeatherData/function.zip"

  role = aws_iam_role.lambda_delete_role.arn
}


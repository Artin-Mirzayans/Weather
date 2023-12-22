const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

exports.handler = async (event) => {
  const region = "us-east-1";
  const tableName = "WeatherData";

  const dynamoDbClient = new DynamoDBClient({ region });

  const READ = async (payload) => {
    const params = {
      TableName: tableName,
    };

    let scanResults = [];
    let items;
    do {
      items = await dynamoDbClient.send(new ScanCommand(params));
      scanResults = [...scanResults, ...items.Items];
      params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey !== "undefined");

    return scanResults;
  };

  try {
    const items = await READ({ TableName: tableName });

    return {
      statusCode: 200,
      body: JSON.stringify(items),
    };
  } catch (error) {
    console.error("Error scanning DynamoDB table:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};

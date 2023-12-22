const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");

const dynamoDBClient = new DynamoDBClient({ region: "us-east-1" });
const tableName = "WeatherData";

exports.handler = async (event, context) => {
  try {
    const location = event.location;

    const params = {
      TableName: tableName,
      Key: {
        Location: { S: location },
      },
    };

    const command = new GetItemCommand(params);
    const { Item } = await dynamoDBClient.send(command);

    if (!Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: "Entry not found for the specified location",
        }),
      };
    }
    t;
    const weatherData = Object.fromEntries(
      Object.entries(Item).map(([key, value]) => [key, Object.values(value)[0]])
    );

    return {
      statusCode: 200,
      body: JSON.stringify(weatherData),
    };
  } catch (error) {
    console.error("Error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "An error occurred" }),
    };
  }
};

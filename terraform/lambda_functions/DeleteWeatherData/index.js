const {
  DynamoDBClient,
  DeleteItemCommand,
} = require("@aws-sdk/client-dynamodb");

const dynamoDBClient = new DynamoDBClient({ region: "us-east-1" }); // Set your desired region
const tableName = "WeatherData"; // Replace with your DynamoDB table name

exports.handler = async (event, context) => {
  // Assuming you're passing the location as a parameter
  const city = event.queryStringParameters.city;
  const country = event.queryStringParameters.country;

  const location = `${city},${country}`;

  if (!location) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Location not provided in the request.",
      }),
    };
  }

  // DynamoDB Delete parameters
  const params = {
    TableName: tableName, // Replace with your DynamoDB table name
    Key: {
      Location: { S: location }, // Assuming location is a string; adjust the type if necessary
    },
  };

  const deleteCommand = new DeleteItemCommand(params);

  try {
    // Delete the item from DynamoDB
    await dynamoDBClient.send(deleteCommand);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Weather data deleted successfully." }),
    };
  } catch (error) {
    console.error("Error deleting weather data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error." }),
    };
  }
};

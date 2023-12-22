const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

const dynamoDBClient = new DynamoDBClient({ region: "us-east-1" });

exports.handler = async (event, context) => {
  try {
    const weatherData = JSON.parse(event.newWeatherData.body);
    const location = event.location;

    const timestamp = new Date().toISOString();

    const params = {
      TableName: "WeatherData",
      Item: {
        Location: { S: location },
        Main: { S: weatherData.main },
        Description: { S: weatherData.description },
        Temperature: { N: `${weatherData.temp}` },
        FeelsLike: { N: `${weatherData.feels_like}` },
        TempMin: { N: `${weatherData.temp_min}` },
        TempMax: { N: `${weatherData.temp_max}` },
        Humidity: { N: `${weatherData.humidity}` },
        Speed: { N: weatherData.wind ? `${weatherData.wind.speed}` : "0" },
        Deg: { N: weatherData.wind ? `${weatherData.wind.deg}` : "0" },
        Rain: { N: `${weatherData.Rain || "0"}` },
        Day1TempMin: { N: `${weatherData.day1temp_min}` },
        Day1TempMax: { N: `${weatherData.day1temp_max}` },
        Day1Temp: { N: `${weatherData.day1temp}` },
        Day2TempMin: { N: `${weatherData.day2temp_min}` },
        Day2TempMax: { N: `${weatherData.day2temp_max}` },
        Day2Temp: { N: `${weatherData.day2temp}` },
        Day3TempMin: { N: `${weatherData.day3temp_min}` },
        Day3TempMax: { N: `${weatherData.day3temp_max}` },
        Day3Temp: { N: `${weatherData.day3temp}` },
        Day4TempMin: { N: `${weatherData.day4temp_min}` },
        Day4TempMax: { N: `${weatherData.day4temp_max}` },
        Day4Temp: { N: `${weatherData.day4temp}` },
        Day5TempMin: { N: `${weatherData.day5temp_min}` },
        Day5TempMax: { N: `${weatherData.day5temp_max}` },
        Day5Temp: { N: `${weatherData.day5temp}` },
        Timestamp: { S: timestamp },
      },
    };

    const command = new PutItemCommand(params);
    await dynamoDBClient.send(command);

    return "Weather data updated in DynamoDB successfully!";
  } catch (error) {
    console.error("Error:", error);
    return "Error updating weather data in DynamoDB";
  }
};

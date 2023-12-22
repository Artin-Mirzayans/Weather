const { lambdaClient, InvokeCommand } = require("./lambdaClient");

async function getWeatherData(location) {
  try {
    const lambdaParams = {
      FunctionName: "GetWeatherData",
      Payload: JSON.stringify({
        location: location,
      }),
    };

    const weatherResponse = await lambdaClient.send(
      new InvokeCommand(lambdaParams)
    );

    const payloadString = Buffer.from(weatherResponse.Payload).toString(
      "utf-8"
    );
    const parsedResponse = JSON.parse(payloadString);

    return {
      statusCode: parsedResponse.statusCode,
      body: parsedResponse.body,
    };
  } catch (error) {
    console.error("Error getting weather data:", error);
    throw error;
  }
}

module.exports = getWeatherData;

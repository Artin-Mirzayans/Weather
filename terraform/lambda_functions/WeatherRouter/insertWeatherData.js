const { lambdaClient, InvokeCommand } = require("./lambdaClient");

function insertWeatherData(location, weatherData) {
  const lambdaParams = {
    FunctionName: "InsertWeatherData",
    InvocationType: "Event",
    Payload: JSON.stringify({ location: location, weatherData: weatherData }),
  };

  try {
    lambdaClient.send(new InvokeCommand(lambdaParams));
  } catch (error) {
    console.error("Error invoking InsertWeatherData Lambda function:", error);
  }
}

module.exports = insertWeatherData;

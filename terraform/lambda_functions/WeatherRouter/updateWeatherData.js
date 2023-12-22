const { lambdaClient, InvokeCommand } = require("./lambdaClient");

function updateWeatherData(location, newWeatherData) {
  const lambdaParams = {
    FunctionName: "UpdateWeatherData",
    InvocationType: "Event",
    Payload: JSON.stringify({
      location: location,
      newWeatherData: newWeatherData,
    }),
  };

  lambdaClient.send(new InvokeCommand(lambdaParams));
}

module.exports = updateWeatherData;

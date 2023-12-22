const { lambdaClient, InvokeCommand } = require("./lambdaClient");

async function fetchWeatherData(location) {
  try {
    const lambdaParams = {
      FunctionName: "FetchWeatherData",
      Payload: JSON.stringify({
        location: location,
      }),
    };
    const fetchDataResponse = await lambdaClient.send(
      new InvokeCommand(lambdaParams)
    );

    const fetchDataPayloadString = Buffer.from(
      fetchDataResponse.Payload
    ).toString("utf-8");
    const fetchData = JSON.parse(fetchDataPayloadString);

    return fetchData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

module.exports = fetchWeatherData;

const getWeatherData = require("./getWeatherData");
const fetchWeatherData = require("./fetchWeatherData");
const verifyRecentWeatherData = require("./verifyRecentWeatherData");
const updateWeatherData = require("./updateWeatherData");
const insertWeatherData = require("./insertWeatherData");
const formatData = require("./formatData");

exports.handler = async (event, context) => {
  const city = event.queryStringParameters.city;
  const country = event.queryStringParameters.country;

  const location = `${city},${country}`;

  try {
    const weatherData = await getWeatherData(location);

    if (weatherData.statusCode === 200) {
      const isRecent = verifyRecentWeatherData(weatherData.body.timestamp);

      if (isRecent) {
        const formattedData = await formatData(location, weatherData.body);
        return {
          statusCode: 200,
          body: JSON.stringify(formattedData),
        };
      } else {
        const fetchData = await fetchWeatherData(location);
        const formattedData = await formatData(location, fetchData.body);
        console.log(formattedData);
        updateWeatherData(location, fetchData);
        return {
          statusCode: 200,
          body: JSON.stringify(formattedData),
        };
      }
    } else if (weatherData.statusCode === 404) {
      const fetchData = await fetchWeatherData(location);
      const formattedData = await formatData(location, fetchData.body);
      console.log(formattedData);
      insertWeatherData(location, fetchData);
      return {
        statusCode: 200,
        body: JSON.stringify(formattedData),
      };
    }
  } catch (error) {
    console.error("Error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "An error occurred" }),
    };
  }
};

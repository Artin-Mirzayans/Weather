const axios = require("axios");
const { parseForecastData } = require("./parseForecastData");

exports.handler = async (event, context) => {
  try {
    const location = event.location;

    const apiKey = process.env.OPENWEATHER_API_KEY;

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=imperial`;

    const currentWeatherResponse = await axios.get(currentWeatherUrl);
    if (currentWeatherResponse.status !== 200) {
      throw new Error(
        `Current weather API error! Status: ${currentWeatherResponse.status}`
      );
    }
    const currentWeatherData = currentWeatherResponse.data;

    const forecastResponse = await axios.get(forecastUrl);
    if (forecastResponse.status !== 200) {
      throw new Error(`Forecast API error! Status: ${forecastResponse.status}`);
    }
    const forecastData = forecastResponse.data;

    const dailyForecasts = parseForecastData(forecastData);

    const formattedData = {
      main: currentWeatherData.weather[0].main,
      description: currentWeatherData.weather[0].description,
      temp: Math.round(currentWeatherData.main.temp),
      feels_like: Math.round(currentWeatherData.main.feels_like),
      temp_min: Math.round(currentWeatherData.main.temp_min),
      temp_max: Math.round(currentWeatherData.main.temp_max),
      humidity: currentWeatherData.main.humidity,
      wind: currentWeatherData.wind,
    };
    Object.keys(dailyForecasts).forEach((day, index) => {
      formattedData[`day${index + 1}temp_min`] = Math.round(
        dailyForecasts[day].temp_min
      );
      formattedData[`day${index + 1}temp_max`] = Math.round(
        dailyForecasts[day].temp_max
      );
      formattedData[`day${index + 1}temp`] = Math.round(
        dailyForecasts[day].temp
      );
    });

    const rain = forecastData.list[0].pop;
    formattedData[`rain`] = rain;

    return {
      statusCode: 200,
      body: JSON.stringify(formattedData),
    };
  } catch (error) {
    console.error("Error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "An error occurred" }),
    };
  }
};

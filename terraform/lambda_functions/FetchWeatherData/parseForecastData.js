const parseForecastData = (forecastData) => {
  const dailyAverages = {};

  for (const entry of forecastData.list) {
    const date = entry.dt_txt.split(" ")[0];

    // Initialize arrays to store temperatures for each day
    if (!dailyAverages[date]) {
      dailyAverages[date] = {
        temp_min: entry.main.temp,
        temp_max: entry.main.temp,
        temp: [],
      };
    } else {
      // Update min and max temperatures
      dailyAverages[date].temp_min = Math.min(
        dailyAverages[date].temp_min,
        entry.main.temp
      );
      dailyAverages[date].temp_max = Math.max(
        dailyAverages[date].temp_max,
        entry.main.temp
      );
    }

    // Extract temperature information
    dailyAverages[date].temp.push(entry.main.temp);
  }

  // Calculate average for each day
  for (const date in dailyAverages) {
    dailyAverages[date].temp = calculateAverage(dailyAverages[date].temp);

    dailyAverages[date].temp = roundToDecimal(dailyAverages[date].temp, 2);
  }

  return dailyAverages;
};

const calculateAverage = (values) => {
  const sum = values.reduce((acc, value) => acc + value, 0);
  return sum / values.length;
};

const roundToDecimal = (value, decimalPlaces) => {
  const factor = 10 ** decimalPlaces;
  return Math.round(value * factor) / factor;
};

module.exports = {
  parseForecastData,
};

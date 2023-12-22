function verifyRecentWeatherData(timestamp) {
  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000; // One hour in milliseconds

  return timestamp >= oneHourAgo;
}

module.exports = verifyRecentWeatherData;

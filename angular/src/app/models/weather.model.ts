export interface Weather {
  Location: { S: string };
  Main: { S: string };
  Description: { S: string };
  Temperature: { N: string };
  FeelsLike: { N: string };
  Humidity: { N: string };
  Speed: { N: string };
  Timestamp: { S: string };
  TempMax: { N: string };
  TempMin: { N: string };
  Rain: { N: string }
  Day1Temp: { N: string };
  Day1TempMax: { N: string };
  Day1TempMin: { N: string };
  Day2Temp: { N: string };
  Day2TempMax: { N: string };
  Day2TempMin: { N: string };
  Day3Temp: { N: string };
  Day3TempMax: { N: string };
  Day3TempMin: { N: string };
  Day4Temp: { N: string };
  Day4TempMax: { N: string };
  Day4TempMin: { N: string };
  Day5Temp: { N: string };
  Day5TempMax: { N: string };
  Day5TempMin: { N: string };
}

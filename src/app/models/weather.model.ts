export interface Weather {
  Location: { S: string };
  Description: { S: string };
  Temperature: { N: string };
  Timestamp: { S: string };
  TempMax: { N: string };
  TempMin: { N: string };
}

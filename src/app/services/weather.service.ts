import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'https://gvmt3kjubf.execute-api.us-east-1.amazonaws.com/dev';

  constructor(private http: HttpClient) { }

  getAllWeather(): Observable<any> {
    const url = `${this.apiUrl}/weather`

    return this.http.post(url, null)
  }


  getWeather(city: string, country: string): Observable<any> {
    const url = `${this.apiUrl}/weather-router?city=${city}&country=${country}`;

    return this.http.post(url, null);
  }

  deleteWeather(city: string, country: string): Observable<any> {
    const url = `${this.apiUrl}/weather/delete?city=${city}&country=${country}`;

    return this.http.post(url, null);
  }

}

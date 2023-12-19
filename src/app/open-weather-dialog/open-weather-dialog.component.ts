import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { WeatherForecastComponent } from '../weather-details/weather-forecast/weather-forecast.component';
import { Weather } from '../models/weather.model';
import { citiestz } from '../../assets/cities-tz';
import moment from 'moment-timezone';

@Component({
  selector: 'app-open-weather-dialog',
  standalone: true,
  imports: [CommonModule, WeatherForecastComponent],
  templateUrl: './open-weather-dialog.component.html',
  styleUrl: './open-weather-dialog.component.scss'
})
export class OpenWeatherDialogComponent {
  cityName: string;
  cityTime: string | undefined;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { weatherItem: Weather }) {
    this.cityName = this.data.weatherItem.Location.S.split(',')[0];
    const timeZone = this.getTimeZone(this.cityName);
    this.cityTime = this.getCurrentTime(timeZone);
  }

  getCurrentTime(timeZone: string | undefined): string | undefined {
    if (timeZone)
      return moment().tz(timeZone).format('h:mm A');
    else
      return undefined;
  }


  getTimeZone(cityName: string): string | undefined {
    const city = citiestz.find(city => city.name.toLowerCase() === cityName.toLowerCase());
    return city ? city.timeZone : undefined;
  }

  ngOnInit() {
    console.log(this.data.weatherItem)
  }

  toPercent(decimalValue: string): string {
    const numericValue = parseFloat(decimalValue);
    if (isNaN(numericValue)) {
      return "0"; // Handle invalid input if needed
    }

    const percentageValue = (numericValue * 100);
    return `${percentageValue}`;
  }
}

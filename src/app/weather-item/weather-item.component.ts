import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Weather } from '../models/weather.model';
import { LastUpdatedService } from '../last-updated.service';
import { CityService } from '../city.service';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-item',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatButtonModule, MatIconModule],
  templateUrl: './weather-item.component.html',
  styleUrl: './weather-item.component.scss'
})
export class WeatherItemComponent {
  constructor(private lastUpdatedService: LastUpdatedService, private cityService: CityService, private weatherService: WeatherService) { }
  @Input()
  weather!: Weather;
  isUpdating: boolean = false;

  getFormattedTime(dateString: string): string {
    return this.lastUpdatedService.formatRelativeTime(dateString);
  }

  handleUpdate() {
    this.isUpdating = true;
    const location = this.weather.Location.S
    const locationParts = location.split(',');
    const city = locationParts[0];
    const country = locationParts[1];
    this.weatherService.getWeather(city!, country).subscribe({
      next: (data) => {
        console.log('Received data:', data);
        this.cityService.updateCity(location, data);
        this.isUpdating = false;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.isUpdating = false;
      },
    });
  }

  handleDelete() {

    this.cityService.removeCity(this.weather.Location.S)
  }
}

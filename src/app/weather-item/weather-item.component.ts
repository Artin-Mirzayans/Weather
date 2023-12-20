import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Weather } from '../models/weather.model';
import { LastUpdatedService } from '../services/last-updated.service';
import { CityService } from '../services/city.service';
import { WeatherService } from '../services/weather.service';
import { OpenWeatherDialogService } from '../services/open-weather-dialog.service';

@Component({
  selector: 'app-weather-item',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatButtonModule, MatIconModule],
  templateUrl: './weather-item.component.html',
  styleUrl: './weather-item.component.scss'
})
export class WeatherItemComponent {
  constructor(private lastUpdatedService: LastUpdatedService, private cityService: CityService, private weatherService: WeatherService, private weatherDialogService: OpenWeatherDialogService) { }
  @Input()
  weather!: Weather;
  isUpdating: boolean = false;
  isFullWidth = false;
  fullWidthThreshold = 600; // Adjust this threshold as needed
  isModalWidth = false;
  modalWidthThreshold = 1000;

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
    this.isUpdating = true;
    const location = this.weather.Location.S
    const locationParts = location.split(',');
    const city = locationParts[0];
    const country = locationParts[1];
    this.weatherService.deleteWeather(city!, country).subscribe({
      next: () => {
        this.cityService.removeCity(this.weather.Location.S)
        this.isUpdating = false;
      },
      error: (error) => {
        console.error('Error deleting data:', error);
        this.isUpdating = false;
      },
    });
  }

  openWeatherInfo() {
    if (!this.isUpdating && this.isModalWidth)
      this.weatherDialogService.openWeatherDialog(this.weather);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkWidth();
  }

  ngOnInit(): void {
    this.checkWidth();
  }

  checkWidth(): void {
    const windowWidth = window.innerWidth;
    this.isFullWidth = windowWidth < this.fullWidthThreshold;
    this.isModalWidth = windowWidth > this.modalWidthThreshold;
  }
}

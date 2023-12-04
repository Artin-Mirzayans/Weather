import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { WeatherService } from '../weather.service';
import { CityService } from '../city.service';
import { WeatherServiceMock } from '../weather.service-mock';
import { WeatherItemComponent } from '../weather-item/weather-item.component';
import { WeatherDialogService } from '../weather-dialog.service';
import { MatDialogModule } from '@angular/material/dialog';
import { Weather } from '../models/weather.model';

;

@Component({
  selector: 'app-weather-grid',
  standalone: true,
  imports: [CommonModule, WeatherItemComponent, MatIconModule, MatDialogModule],
  templateUrl: './weather-grid.component.html',
  styleUrl: './weather-grid.component.scss'
})
export class WeatherGridComponent {
  city!: Weather;

  constructor(public cityService: CityService, private weatherService: WeatherService, private weatherServiceMock: WeatherServiceMock, private dialogService: WeatherDialogService) { }

  // ngOnInit(): void {
  //   this.weatherService.getAllWeather().subscribe({
  //     next: (data) => {
  //       console.log('Received data:', data);
  //       this.allWeatherData = data; // Assuming you want to assign the data to a property
  //     },
  //     error: (error) => {
  //       console.error('Error fetching data:', error);
  //     },
  //   });
  // }

  openDialog(): void {
    this.dialogService.openWeatherDialog();
  }

  ngOnInit(): void {
    this.weatherServiceMock.getAllWeather().subscribe((data) => {
      console.log(data);
      this.cityService.insertCities(data);
    })
  }
}

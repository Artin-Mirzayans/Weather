import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../services/weather.service';
import { CityService } from '../services/city.service';
import { WeatherServiceMock } from '../services/weather.service-mock';
import { WeatherItemComponent } from '../weather-item/weather-item.component';
import { Weather } from '../models/weather.model';

;

@Component({
  selector: 'app-weather-grid',
  standalone: true,
  imports: [CommonModule, WeatherItemComponent],
  templateUrl: './weather-grid.component.html',
  styleUrl: './weather-grid.component.scss'
})
export class WeatherGridComponent {
  city!: Weather;

  constructor(public cityService: CityService, private weatherService: WeatherService, private weatherServiceMock: WeatherServiceMock) { }

  ngOnInit(): void {
    this.weatherService.getAllWeather().subscribe({
      next: (data) => {
        this.cityService.insertCities(data); // Assuming you want to assign the data to a property
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
    });
  }
}

//   ngOnInit(): void {
//     this.weatherServiceMock.getAllWeather().subscribe((data) => {
//       console.log(data);
//       this.cityService.insertCities(data);
//     })
//   }


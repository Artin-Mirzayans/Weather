import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../weather.service';
import { WeatherServiceMock } from '../weather.service-mock';
import { WeatherItemComponent } from '../weather-item/weather-item.component';

@Component({
  selector: 'app-weather-grid',
  standalone: true,
  imports: [CommonModule, WeatherItemComponent],
  templateUrl: './weather-grid.component.html',
  styleUrl: './weather-grid.component.scss'
})
export class WeatherGridComponent {
  allWeatherData: any;

  constructor(private weatherService: WeatherService, private weatherServiceMock: WeatherServiceMock) { }

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

  ngOnInit(): void {
    this.weatherServiceMock.getAllWeather().subscribe((data) => {
      console.log(data);
      this.allWeatherData = data;
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  weatherData: any;

  constructor(private weatherService: WeatherService) { }



  ngOnInit(): void {
    // const city = "Los Angeles";
    // const country = "US";
    // this.weatherService.getWeather(city, country).subscribe({
    //   next: (data) => {
    //     // Process the data here
    //     console.log('Received data:', data);
    //     this.weatherData = data; // Assuming you want to assign the data to a property
    //   },
    //   error: (error) => {
    //     // Handle errors here
    //     console.error('Error fetching data:', error);
    //   },
    // });
  }

}

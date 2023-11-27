import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Weather } from '../models/weather.model';

@Component({
  selector: 'app-weather-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-item.component.html',
  styleUrl: './weather-item.component.scss'
})
export class WeatherItemComponent {
  @Input() weather: Weather | undefined;
}

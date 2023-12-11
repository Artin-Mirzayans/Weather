import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Weather } from '../models/weather.model';

@Component({
  selector: 'app-open-weather-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './open-weather-dialog.component.html',
  styleUrl: './open-weather-dialog.component.scss'
})
export class OpenWeatherDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { weatherItem: Weather }) { }

  ngOnInit() {
    console.log(this.data.weatherItem)
  }
}

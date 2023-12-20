import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cities } from '../../assets/cities';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WeatherService } from '../services/weather.service';
import { CityService } from '../services/city.service';
import { AddWeatherDialogService } from '../services/add-weather-dialog.service';

@Component({
  selector: 'app-add-weather-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule,
    MatFormFieldModule,
    MatButtonModule, MatInputModule, MatIconModule,
    MatAutocompleteModule, MatProgressSpinnerModule,
    ReactiveFormsModule],
  templateUrl: './add-weather-dialog.component.html',
  styleUrl: './add-weather-dialog.component.scss'
})
export class AddWeatherDialogComponent {

  @ViewChild('input')
  input!: ElementRef<HTMLInputElement>;
  value = 'Clear me';
  cityOptions: string[] = cities;
  filteredCities: string[];
  isLoading: boolean = false;
  form = new FormControl('')

  constructor(private cityService: CityService, private weatherService: WeatherService, private weatherDialogService: AddWeatherDialogService) {
    this.filteredCities = this.cityOptions.slice();
  }


  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredCities = this.cityOptions.filter(o => o.toLowerCase().includes(filterValue));
  }

  clearInput(): void {
    this.form.setValue('')
  }

  submitForm() {
    const selectedCity = this.form.value;

    if (this.validateInput(selectedCity!)) {
      this.isLoading = true;
      const city = selectedCity;
      const country = "US";
      this.weatherService.getWeather(city!, country).subscribe({
        next: (data) => {
          console.log('Received data:', data);
          this.cityService.addCity(data);
          this.weatherDialogService.closeWeatherDialog();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching data:', error);
          this.isLoading = false;
          this.form.setErrors({ 'fetchError': true })
        },
      });
    }
  }

  validateInput(selectedCity: string): boolean {
    if (selectedCity === null || selectedCity === '') {
      console.log(selectedCity)
      this.form.setErrors({ 'emptyInput': true })
      return false;
    }
    if (!this.cityOptions.includes(selectedCity)) {
      this.form.setErrors({ 'invalidCity': true })
      return false;
    }
    if (this.cityService.cities.some(city => city.Location.S === `${selectedCity},US`)) {
      this.form.setErrors({ 'duplicateCity': true })
      return false;
    }

    if (this.cityService.cities.length > 11) {
      this.form.setErrors({ 'maxCities': true })
      return false;
    }
    return true;
  }
}

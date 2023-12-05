import { Injectable } from '@angular/core';
import { Weather } from './models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  cities: Weather[] = [];

  insertCities(newCities: Weather[]): void {
    newCities.sort((a, b) => new Date(b.Timestamp.S).getTime() - new Date(a.Timestamp.S).getTime());
    this.cities = newCities;
  }

  addCity(newCity: Weather): void {
    this.cities.unshift(newCity);
    console.log(newCity);
    console.log(this.cities);
  }

  updateCity(location: string, updatedCity: Weather): void {
    const indexToUpdate = this.cities.findIndex(city => city.Location.S === location);

    if (indexToUpdate !== -1) {
      this.cities[indexToUpdate] = { ...this.cities[indexToUpdate], ...updatedCity };
      const updatedCityCopy = this.cities[indexToUpdate];
      this.cities.splice(indexToUpdate, 1);
      this.cities.unshift(updatedCityCopy);
    }

  }

  removeCity(location: string): void {
    const indexToRemove = this.cities.findIndex(city => city.Location.S === location);

    if (indexToRemove !== -1)
      this.cities.splice(indexToRemove, 1)
  }
}

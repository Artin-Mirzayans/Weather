import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MockData } from '../assets/mock-data';

@Injectable({
    providedIn: 'root'
})
export class WeatherServiceMock {

    getAllWeather(): Observable<any> {
        return of(MockData)
    }


}

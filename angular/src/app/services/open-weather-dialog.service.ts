import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OpenWeatherDialogComponent } from '../open-weather-dialog/open-weather-dialog.component';
import { Weather } from '../models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class OpenWeatherDialogService {
  private dialogRef: MatDialogRef<OpenWeatherDialogComponent> | null = null;

  constructor(private dialog: MatDialog) { }

  openWeatherDialog(weatherItem: Weather): void {
    this.dialogRef = this.dialog.open(OpenWeatherDialogComponent, {
      height: '700px',
      width: '900px',
      data: { weatherItem: weatherItem },
      panelClass: 'OpenWeatherModal'
    });
  }

  closeWeatherDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}

import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddWeatherDialogComponent } from '../add-weather-dialog/add-weather-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AddWeatherDialogService {
  private dialogRef: MatDialogRef<AddWeatherDialogComponent> | null = null;

  constructor(private dialog: MatDialog) { }

  openWeatherDialog(): void {
    this.dialogRef = this.dialog.open(AddWeatherDialogComponent, {
      height: '400px',
      width: '600px',
    });
  }

  closeWeatherDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}

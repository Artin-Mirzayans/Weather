import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddWeatherDialogService } from '../services/add-weather-dialog.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private dialogService: AddWeatherDialogService) { }

  openDialog(): void {
    this.dialogService.openWeatherDialog();
  }
}

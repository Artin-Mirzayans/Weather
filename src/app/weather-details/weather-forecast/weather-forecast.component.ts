import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { Weather } from '../../models/weather.model';

@Component({
  selector: 'app-weather-forecast',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.scss'
})
export class WeatherForecastComponent {

  @Input()
  weatherData!: Weather;
  lineChartLabels: string[] = [];
  lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Series A',
        backgroundColor: '#319DFF',
        borderColor: '#FFFFFF',
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: [],
  };
  lineChartLegend = false;
  lineChartType = 'line';


  ngOnInit() {
    this.createChart();
  }

  createChart() {
    if (this.weatherData) {
      const labels = this.getNext5DaysLabels(this.weatherData.Timestamp.S)
      const data = [
        Number(this.weatherData.Day1Temp.N),
        Number(this.weatherData.Day2Temp.N),
        Number(this.weatherData.Day3Temp.N),
        Number(this.weatherData.Day4Temp.N),
        Number(this.weatherData.Day5Temp.N),
      ];

      this.lineChartData.labels = labels;
      this.lineChartData.datasets[0].data = data;
    }
  }

  private getNext5DaysLabels(timestamp: string): string[] {
    const labels = [];
    const currentDate = new Date(timestamp);

    for (let i = 0; i < 5; i++) {
      // Increment the date by one day
      currentDate.setDate(currentDate.getDate() + 1);

      // Get the day name
      const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });

      // Get the day in the format MM/DD
      const dayOfMonth = currentDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });

      labels.push(`${dayName}`);
    }

    return labels;
  }

}

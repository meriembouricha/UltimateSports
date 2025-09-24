import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../analytics.service';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-daily-sales-chart',
  templateUrl: './daily-sales-chart.component.html'
})
export class DailySalesChartComponent implements OnInit {
  lineChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  chartOptions: ChartConfiguration<'line'>['options'] = { responsive: true };

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    this.analyticsService.getDailySales(year, month).subscribe(data => {
      this.lineChartData = {
        labels: data.map(d => `Jour ${d.day}`),
        datasets: [{
          data: data.map(d => d.totalAmount),
          label: 'Ventes quotidiennes',
          borderColor: '#66bb6a',
          fill: false
        }]
      };
    });
  }
}

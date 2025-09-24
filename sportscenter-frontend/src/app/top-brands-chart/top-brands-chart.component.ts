import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../analytics.service';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-top-brands-chart',
  templateUrl: './top-brands-chart.component.html'
})
export class TopBrandsChartComponent implements OnInit {
  barChartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 }
      }
    }
  };

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.analyticsService.getTopBrands().subscribe(data => {
      this.barChartData = {
        labels: data.map(d => d[0]), // brand names
        datasets: [{
          data: data.map(d => d[1]), // quantities sold
          label: 'Top marques',
          backgroundColor: '#9575cd'
        }]
      };
    });
  }
}

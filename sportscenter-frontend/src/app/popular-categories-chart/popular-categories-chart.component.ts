import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../analytics.service';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-popular-categories-chart',
  templateUrl: './popular-categories-chart.component.html'
})
export class PopularCategoriesChartComponent implements OnInit {
  barChartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  barChartOptions: ChartConfiguration<'bar'>['options'] = { responsive: true };

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.analyticsService.getPopularCategories().subscribe(data => {
      this.barChartData = {
        labels: data.map(d => d[0]),
        datasets: [
          {
            label: 'Catégories populaires',
            backgroundColor: '#4db6ac',
            data: data.map(d => d[1])
          }
        ]
      };

    });
  }
}

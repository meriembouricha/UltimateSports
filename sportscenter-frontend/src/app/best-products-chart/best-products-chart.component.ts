import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../analytics.service';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-best-products-chart',
  templateUrl: './best-products-chart.component.html'
})
export class BestProductsChartComponent implements OnInit {
  barChartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  barChartOptions: ChartConfiguration<'bar'>['options'] = { responsive: true };

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.analyticsService.getBestSellingProducts().subscribe(data => {
      this.barChartData = {
        labels: data.map(d => d[0]),
        datasets: [{
          data: data.map(d => d[1]),
          label: 'Produits les plus vendus',
          backgroundColor: '#ffb74d'
        }]
      };
    });
  }
}

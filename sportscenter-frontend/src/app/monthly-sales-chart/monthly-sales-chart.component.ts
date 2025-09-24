import { Component, OnInit, inject } from '@angular/core';
import { ChartType, ChartConfiguration } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { AnalyticsService } from '../analytics.service';
import { Chart } from 'chart.js';

Chart.register(DataLabelsPlugin);
@Component({
  selector: 'app-monthly-sales-chart',
  templateUrl: './monthly-sales-chart.component.html',
})
export class MonthlySalesChartComponent implements OnInit {
  private analyticsService = inject(AnalyticsService);

  barChartType: 'bar' = 'bar';
  barChartPlugins = [DataLabelsPlugin];

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw as number;
            return `Ventes: ${value.toLocaleString()}`;
          }
        }
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        formatter: (value) => {
          const val = value as number;
          return val > 0 ? val.toLocaleString() : ''; // don't label zeros
        },
        color: '#000',
        font: {
          weight: 'bold',
        },
      }
    },
    scales: {
      y: {
        min: 0,
        max: 200000, // Force a fixed max scale
        ticks: {
          stepSize: 50000,
          callback: (value) => (value as number).toLocaleString()
        }
      }
    }
  };


  barChartData: ChartConfiguration<'bar', number[], string>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Total des ventes', backgroundColor: '#f9b4b4' }],
  };

  ngOnInit(): void {
    const year = new Date().getFullYear();
    const monthNames = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];

    this.analyticsService.getMonthlySales(year).subscribe((data) => {
      const labels = data.map(d => monthNames[d.month - 1]);
      const values = data.map(d => d.totalAmount);

      this.barChartData = {
        labels: labels,
        datasets: [{
          data: values,
          label: 'Total des ventes',
          backgroundColor: '#f9b4b4',
        }],
      };
    });
  }

}

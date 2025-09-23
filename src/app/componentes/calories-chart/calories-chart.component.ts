import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-calories-chart',
  templateUrl: './calories-chart.component.html',
  styleUrls: ['./calories-chart.component.scss'],
  standalone:false,
})
export class CaloriesChartComponent implements OnInit, OnChanges {
  @Input() consumed: number = 199;
  @Input() target: number = 2000;
  @Input() userId?: string;
  @Input() date?: string;

  percentage: number = 0;
  remaining: number = 0;
  caloriesLabel: string = '';
  chartInitialized: boolean = false;

  doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Consommées', 'Restantes'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#FFC107', '#e5e7eb'],
        hoverBackgroundColor: ['#FFB300', '#d1d5db'],
        borderWidth: 0,
      },
    ],
  };

  doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw} kcal`;
          },
        },
      },
    },
  };

  ngOnInit() {
    this.chartInitialized = true;
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chartInitialized) {
      this.updateChart();
    }
  }

  updateChart() {
    this.remaining = Math.max(this.target - this.consumed, 0);
    this.percentage = this.target > 0 ? Math.round((this.consumed / this.target) * 100) : 0;
    this.caloriesLabel = `${this.consumed} / ${this.target} kcal`;

    this.doughnutChartData = {
      ...this.doughnutChartData,
      datasets: [{
        ...this.doughnutChartData.datasets[0],
        data: [this.consumed, this.remaining]
      }]
    };
  }
}
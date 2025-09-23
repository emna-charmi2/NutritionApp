import { Component, Input, OnChanges } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
@Component({
  selector: 'app-daily-progression',
  templateUrl: './daily-progression.component.html',
  styleUrls: ['./daily-progression.component.scss'],
  standalone: false,
})
export class DailyProgressionComponent implements OnChanges {
  @Input() totalCalories = 0;
  @Input() protein = { consumed: 0, target: 150 };
  @Input() carbs = { consumed: 0, target: 200 };
  @Input() fat = { consumed: 0, target: 65 };

  // Configuration du graphique
  public pieChartType: ChartType = 'doughnut';
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
   
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    }
  };

  public pieChartData = {
    labels: ['Protein', 'Glucide', 'Lipide'],
    datasets: [{
      data: [0, 0, 0],
      backgroundColor: ['#1976D2', '#FF9800', '#F06292'],
      borderWidth: 0
    }]
  };

  ngOnChanges() {
    this.updateChartData();
  }

  private updateChartData() {
    this.pieChartData.datasets[0].data = [
      this.protein.consumed,
      this.carbs.consumed,
      this.fat.consumed
    ];
  }

  getProteinPercentage(): number {
    return Math.min( (this.protein.consumed / this.protein.target) * 100);
  }

  getCarbsPercentage(): number {
    return Math.min((this.carbs.consumed / this.carbs.target) * 100);
  }

  getFatPercentage(): number {
    return Math.min( (this.fat.consumed / this.fat.target) * 100);
  }
}

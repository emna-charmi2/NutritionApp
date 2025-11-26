import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import des modules de formulaire
import { IonicModule } from '@ionic/angular';
import { CaloriesChartComponent } from '../componentes/calories-chart/calories-chart.component';
import { Chart, registerables } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { RouterModule } from '@angular/router';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { Tab2Page } from './tab2.page';

// Register Chart.js components
Chart.register(...registerables);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BaseChartDirective,

       RouterModule.forChild([
          {
            path: '',
            component: Tab2Page,
          }
        ])
      ],


  declarations: [Tab2Page, CaloriesChartComponent],
})
export class Tab2PageModule {}

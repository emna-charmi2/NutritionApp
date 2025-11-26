import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Tab1Page } from './tab1.page';
// Import necessary Firebase modules
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { environment } from 'src/environments/environment';

// Import Chart.js and required components
import { Chart, registerables } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { RepasRecentComponent } from '../componentes/repas-recent/repas-recent.component';

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
        component: Tab1Page,
      }
    ])
  ],
  declarations: [Tab1Page,RepasRecentComponent],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideDatabase(() => getDatabase()),
    provideCharts(withDefaultRegisterables()) // Add this provider
  ]
})
export class Tab1PageModule {}

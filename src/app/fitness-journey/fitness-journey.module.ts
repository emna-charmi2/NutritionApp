import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FitnessJourneyPageRoutingModule } from './fitness-journey-routing.module';
import { FitnessJourneyPage } from './fitness-journey.page';
import { WaterComponent } from '../componentes/water/water.component';
import { ActivityListComponent } from '../componentes/activity-list/activity-list.component';
import { DailyProgressionComponent } from '../componentes/daily-progression/daily-progression.component';
import { BaseChartDirective } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FitnessJourneyPageRoutingModule,
    BaseChartDirective,
    FitnessJourneyPageRoutingModule,
    
  ],
  declarations: [
    FitnessJourneyPage,
    DailyProgressionComponent,
    WaterComponent,
    ActivityListComponent,
 
  ],
  providers :[]
})
export class FitnessJourneyPageModule {}

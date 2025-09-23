import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { BaseChartDirective } from 'ng2-charts';
import { StartCardComponent } from '../componentes/start-card/start-card.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab3PageRoutingModule,
    BaseChartDirective
  ],
  declarations: [Tab3Page,
    StartCardComponent
  ]
})
export class Tab3PageModule {}

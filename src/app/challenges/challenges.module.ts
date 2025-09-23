import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChallengesPageRoutingModule } from './challenges-routing.module';

import { ChallengePage } from './challenges.page';
import { WalkChallengeComponent } from '../componentes/walk-challenge/walk-challenge.component';
import { SugarChallengeComponent } from '../componentes/sugar-challenge/sugar-challenge.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChallengesPageRoutingModule
  ],
  declarations: [ChallengePage,WalkChallengeComponent,SugarChallengeComponent]
})
export class ChallengesPageModule {}

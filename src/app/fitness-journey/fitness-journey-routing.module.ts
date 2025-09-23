import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FitnessJourneyPage } from './fitness-journey.page';

const routes: Routes = [
  {
    path: '',
    component: FitnessJourneyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FitnessJourneyPageRoutingModule {}

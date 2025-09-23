import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import des modules de formulaire
import { IonicModule } from '@ionic/angular';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { Tab2Page } from './tab2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,        // Nécessaire pour ngModel
    ReactiveFormsModule, // Optionnel mais recommandé
    IonicModule,
    Tab2PageRoutingModule
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
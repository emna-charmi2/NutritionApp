import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistrePage } from './registre.page';
import { RegistrePageRoutingModule } from './registre-routing.module';

@NgModule({
  declarations: [RegistrePage], // Ensure it is declared here
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistrePageRoutingModule,
  ],
})
export class RegistrePageModule {}

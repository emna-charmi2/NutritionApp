import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ProfilePage } from './profile.page';

@NgModule({
  declarations: [ProfilePage],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfilePage,
      },
    ]),
  ],
})
export class ProfilePageModule {}
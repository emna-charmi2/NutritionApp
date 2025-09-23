import { Component, Input } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-water',
  templateUrl: './water.component.html',
  styleUrls: ['./water.component.scss'],
  standalone: false,
})
export class WaterComponent   {

  @Input() consumed: number = 350;
  @Input() total: number = 1750; // Supposant que 7 verres = 1750ml (250ml par verre)
  @Input() glassesConsumed: number = 0;
  @Input() totalGlasses: number = 7;

  glassVolume = this.total / this.totalGlasses;

  glasses = new Array(this.totalGlasses); // juste pour *ngFor

  constructor(private toastController: ToastController) {}

  async drinkGlass(index: number) {
    // L'utilisateur doit cliquer dans l'ordre
    if (index === this.glassesConsumed) {
      this.glassesConsumed++;
      this.consumed = this.glassesConsumed * this.glassVolume;
    } else {
      // Mauvais ordre, afficher un toast
      const toast = await this.toastController.create({
        message: "respexte l'ordre des verres",
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
      toast.present();
    }
  }
}



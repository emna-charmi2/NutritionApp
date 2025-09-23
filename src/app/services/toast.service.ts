import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastCtrl: ToastController) {}

  async showSuccess(message: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color: 'success',
      position: 'top'
    });
    await toast.present();
  }

  async showError(message: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      duration: 5000,
      color: 'danger',
      position: 'top',
      buttons: [{ text: 'OK', role: 'cancel' }]
    });
    await toast.present();
  }
}
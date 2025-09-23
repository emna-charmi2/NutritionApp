import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ResetService } from '../services/reset.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
  standalone:false,
})
export class ResetPage {
  email: string = '';

  constructor(
    private resetService: ResetService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async resetPassword() {
    if (!this.email || !this.email.includes('@')) {
      this.showToast('Veuillez entrer une adresse email valide.', 'danger');
      return;
    }

    try {
      await this.resetService.resetPassword(this.email);
      this.showToast(
        'Lien de réinitialisation envoyé. Vérifiez votre boîte mail.',
        'success'
      );
      this.router.navigate(['/login']);
    } catch (error: any) {
      console.error('Erreur :', error);
      const message =
        error.code === 'auth/user-not-found'
          ? 'Aucun utilisateur trouvé avec cette adresse email.'
          : 'Une erreur est survenue. Veuillez réessayer plus tard.';
      this.showToast(message, 'danger');
    }
  }

  private async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'middle',
      color,
      buttons: [{ text: 'OK', role: 'cancel' }],
    });
    await toast.present();
  }
}

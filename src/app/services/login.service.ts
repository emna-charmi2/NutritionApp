import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private auth: Auth,
    private router: Router,
    private toastController: ToastController
  ) {}

  async signIn(email: string, password: string): Promise<void> {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      if (result.user) {
        // Redirect or perform any action after successful login
        this.router.navigate(['/tabs']);
      }
    } catch (error: unknown) {
      let errorMessage = 'Failed to sign in';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      throw new Error(errorMessage);
    }
  }

  async presentToast(message: string, color: 'success' | 'danger'): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color
    });
    await toast.present();
  }
  async getCurrentUserId(): Promise<string> {
    const user = await this.auth.currentUser;
    return user?.uid || '';
  }
}

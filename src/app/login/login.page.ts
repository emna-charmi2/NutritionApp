import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false,
})
export class LoginPage {
  loginForm: FormGroup;
  formSubmitted = false;
  isLoading = false;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private toastController: ToastController,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
      ]]
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return (control?.invalid && (control?.dirty || control?.touched || this.formSubmitted)) || false;
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);

    if (!control || !control.errors) return '';

    if (control.hasError('required')) {
      return 'Ce champ est obligatoire';
    } else if (control.hasError('email')) {
      return 'Email invalide';
    } else if (control.hasError('pattern') && field === 'password') {
      return 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial';
    }

    return '';
  }

  async login(): Promise<void> {
    this.formSubmitted = true;
    if (this.loginForm.invalid || this.isLoading) return;
    this.isLoading = true;
    try {
      const { email, password } = this.loginForm.value;
      await this.loginService.signIn(email, password);
      await this.presentToast('Connexion réussie !', 'success');
    } catch (error: any) {
      await this.presentToast(error.message || 'Vérifie les données ', 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  private async presentToast(message: string, color: 'success' | 'danger'): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color
    });
    await toast.present();
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../services/sign.service';
import { ToastController, NavController, LoadingController } from '@ionic/angular';
import { User } from '../models/user.model';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.page.html',
  styleUrls: ['./registre.page.scss'],
  standalone:false,
})
export class RegistrePage {
  regForm!: FormGroup;
  currentStep = 1;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.regForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      gender: ['', Validators.required],
      height: ['', [Validators.required, Validators.min(100), Validators.max(250)]],
      weight: ['', [Validators.required, Validators.min(30), Validators.max(200)]],
      activityLevel: ['', Validators.required],
      goal: ['', Validators.required]
    });
  }

  shouldShowError(controlName: string): boolean {
    const control = this.regForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  isCurrentStepValid(): boolean {
    const stepControls = {
      1: ['nom', 'prenom', 'email', 'password', 'gender'],
      2: ['height', 'weight'],
      3: ['activityLevel', 'goal']
    };
    return stepControls[this.currentStep as keyof typeof stepControls]
      .every(control => this.regForm.get(control)?.valid);
  }

  nextStep(): void {
    if (this.isCurrentStepValid()) {
      this.currentStep++;
    } else {
      this.markStepAsTouched();
    }
  }

  previousStep(): void {
    this.currentStep--;
  }

  async signUp(): Promise<void> {
    if (this.regForm.invalid || this.isSubmitting) return;
    this.isSubmitting = true;
    const loading = await this.loadingCtrl.create({
      message: 'Inscription en cours...',
      spinner: 'crescent'
    });
    await loading.present();
    try {
      const userPrenom = await this.signupService.registerUser(this.regForm.value as User);
      await loading.dismiss();
      await this.showToast(`Bienvenue ${userPrenom} 👋`, 'success');
      this.navCtrl.navigateRoot('/tabs');
    } catch (error: unknown) {
      await loading.dismiss();
      let errorMessage = 'Une erreur est survenue';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      await this.showToast(errorMessage, 'danger');
      console.error('Erreur inscription:', error);
    } finally {
      this.isSubmitting = false;
    }
  }

  private markStepAsTouched(): void {
    const controls = {
      1: ['nom', 'prenom', 'email', 'password', 'gender'],
      2: ['height', 'weight'],
      3: ['activityLevel', 'goal']
    };
    controls[this.currentStep as keyof typeof controls].forEach(control => {
      this.regForm.get(control)?.markAsTouched();
    });
  }

  private async showToast(message: string, color: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom',
      color
    });
    await toast.present();
  }
}

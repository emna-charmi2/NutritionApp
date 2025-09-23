import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Meal } from '../models/user.model';
import { MealsService } from '../services/meal.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-recipes',
  templateUrl: 'recipes.page.html',
  styleUrls: ['recipes.page.scss'],
  standalone:false,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class RecipesPage {
  activeSection: string | null = null;

  constructor(
    private mealsService: MealsService,
    private alertController: AlertController
  ) {}

  toggleSection(section: string) {
    this.activeSection = this.activeSection === section ? null : section;
  }

  async addMeal(
    name: string, 
    timeSegment: string, 
    calories: number, 
    protein: number, 
    glucide: number, 
    lipide: number
  ) {
    const validTimeSegment = this.validateTimeSegment(timeSegment);
  
    const newMeal: Omit<Meal, 'id'> = { // Notez l'utilisation de Omit
      name,
      calories,
      protein,
      glucide,
      lipide,
      date: new Date(),
      timeSegment: validTimeSegment
    };
  
    try {
      await this.mealsService.addMeal(newMeal);
      await this.showSuccessAlert('Repas ajouté avec succès !');
    } catch (error) {
      console.error('Erreur:', error);
      this.showErrorAlert('Échec de l\'ajout du repas');
    }
  }
  private validateTimeSegment(value: string): Meal['timeSegment'] {
    const validValues: Meal['timeSegment'][] = ['breakfast', 'lunch', 'dinner', 'snack'];
    return validValues.includes(value.toLowerCase() as Meal['timeSegment']) 
      ? value.toLowerCase() as Meal['timeSegment'] 
      : 'lunch';
  }

  private async showSuccessAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Succès',
      message,
      buttons: ['OK'],
      cssClass: 'success-alert'
    });
    await alert.present();
  }

  private async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Erreur',
      message,
      buttons: ['OK'],
      cssClass: 'error-alert'
    });
    await alert.present();
  }
}
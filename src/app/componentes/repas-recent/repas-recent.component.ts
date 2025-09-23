import { Component, OnInit } from '@angular/core';
import { Meal } from '../../models/user.model';
import { MealsService } from '../../services/meal.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-repas-recent',
  templateUrl: './repas-recent.component.html',
  styleUrls: ['./repas-recent.component.scss'],
  standalone: false,
})
export class RepasRecentComponent implements OnInit {
  meals: Meal[] = [];
  isLoading: boolean = true;

  constructor(
    private mealsService: MealsService,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    await this.loadMeals();
  }

  async loadMeals() {
    this.isLoading = true;
    try {
      this.meals = await this.mealsService.getMeals();
    } catch (error) {
      console.error('Erreur:', error);
      await this.showErrorAlert('Échec du chargement des repas');
    } finally {
      this.isLoading = false;
    }
  }

  async confirmDelete(mealId: number) { // Changé en number
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Voulez-vous vraiment supprimer ce repas ?',
      buttons: [
        { text: 'Annuler', role: 'cancel' },
        { text: 'Supprimer', handler: () => this.deleteMeal(mealId) }
      ]
    });
    await alert.present();
  }

  private async deleteMeal(mealId: number) { // Changé en number
    try {
      await this.mealsService.deleteMeal(mealId);
      // Mise à jour locale après suppression
      this.meals = this.meals.filter(meal => meal.id !== mealId);
    } catch (error) {
      console.error('Erreur:', error);
      await this.showErrorAlert('Échec de la suppression');
    }
  }

  private async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Erreur',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
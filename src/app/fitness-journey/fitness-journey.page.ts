import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-fitness-journey',
  templateUrl: './fitness-journey.page.html',
  styleUrls: ['./fitness-journey.page.scss'],
  standalone: false,
})
export class FitnessJourneyPage {
  nutritionData = {
    calories: 1200,
    protein: { consumed: 190, target: 150 },
    carbs: { consumed: 120, target: 200 },
    fat: { consumed: 40, target: 65 }
  };

  glasses: boolean[] = [];
  dailyGoal: number = 8; // Par exemple 8 verres d'eau par jour
  currentDate: string = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  message: string = '';

  constructor(
    private storage: Storage,
    private toastController: ToastController
  ) {}

  // Méthode pour ajouter un repas
  addMeal(meal: any) {
    this.nutritionData.calories += meal.calories;
    this.nutritionData.protein.consumed += meal.protein;
    this.nutritionData.carbs.consumed += meal.carbs;
    this.nutritionData.fat.consumed += meal.fat;
  }

  async ngOnInit() {
    await this.storage.create();
    this.glasses = new Array(this.dailyGoal).fill(false);
    await this.loadWaterProgress();
  }

  // Charge la progression de l'eau depuis le stockage local
  async loadWaterProgress() {
    const savedProgress = await this.storage.get(`water-${this.currentDate}`);
    if (savedProgress && savedProgress.glasses) {
      this.glasses = savedProgress.glasses;
    } else {
      this.glasses = new Array(this.dailyGoal).fill(false);
    }
    this.updateWaterMessage();
  }

  // Change l'état d'un verre d'eau (rempli / non)
  async toggleGlass(index: number) {
    if (index > 0 && !this.glasses[index - 1]) {
      const toast = await this.toastController.create({
        message: 'Please fill glasses in order',
        duration: 2000,
        color: 'warning'
      });
      await toast.present();
      return;
    }

    this.glasses[index] = !this.glasses[index];
    this.updateWaterMessage();
    await this.saveWaterProgress();
  }

  // Met à jour le message affiché à l'utilisateur
  updateWaterMessage() {
    const filledCount = this.glasses.filter(g => g).length;
    this.message = `You drank ${filledCount} of ${this.dailyGoal} glasses of water`;

    if (filledCount === this.dailyGoal) {
      this.message = 'Good job! You reached your goal today!';
    }
  }

  // Sauvegarde la progression dans le stockage local
  async saveWaterProgress() {
    await this.storage.set(`water-${this.currentDate}`, {
      glasses: this.glasses,
      date: this.currentDate
    });
  }

  // Réinitialise la progression de consommation d'eau
  async resetWaterProgress() {
    this.glasses = new Array(this.dailyGoal).fill(false);
    this.updateWaterMessage();
    await this.saveWaterProgress();
  }
}

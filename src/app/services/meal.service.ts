import { Injectable } from '@angular/core';
import { Meal } from '../models/user.model';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  private storageKey = 'user_meals';

  constructor(private storage: Storage) {
    this.initStorage();
  }

  private async initStorage() {
    await this.storage.create();
  }

  async addMeal(meal: Omit<Meal, 'id'>): Promise<void> {
    const meals = await this.getMeals();
    const newMeal: Meal = {
      ...meal,
      id: Date.now(), // Génère un ID unique
      date: new Date(meal.date) // Assure que c'est un objet Date
    };
    meals.unshift(newMeal); // Ajoute au début du tableau
    await this.storage.set(this.storageKey, meals);
  }

  async getMeals(): Promise<Meal[]> {
    const meals = (await this.storage.get(this.storageKey)) || [];
    // Convertit les dates string en objets Date
    return meals.map((meal: { date: string | number | Date; }) => ({
      ...meal,
      date: new Date(meal.date)
    }));
  }

  async deleteMeal(mealId: number): Promise<void> {
    let meals = await this.getMeals();
    meals = meals.filter(meal => meal.id !== mealId);
    await this.storage.set(this.storageKey, meals);
  }

  async clearAllMeals(): Promise<void> {
    await this.storage.remove(this.storageKey);
  }

  async updateMeal(updatedMeal: Meal): Promise<void> {
    let meals = await this.getMeals();
    const index = meals.findIndex(meal => meal.id === updatedMeal.id);
    if (index !== -1) {
      meals[index] = updatedMeal;
      await this.storage.set(this.storageKey, meals);
    }
  }
}
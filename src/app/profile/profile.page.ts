import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface UserProfile {
  name: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  targetWeight: number;
  goal: string;
  activityLevel: string;
  dailyCalories: number;
  joinDate: string;
}

interface Achievement {
  name: string;
  emoji: string;
  color: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage  {

 
    userProfile: UserProfile = {
      name: 'Marie Dupont',
      age: 28,
      gender: 'Femme',
      height: 165,
      weight: 72.5,
      targetWeight: 68,
      goal: 'Perte de poids',
      activityLevel: 'Modérée',
      dailyCalories: 2000,
      joinDate: 'Janvier 2024'
    };
  
    achievements: Achievement[] = [
      { name: '7 jours consécutifs', emoji: '🔥', color: 'bg-orange-100' },
      { name: 'Objectif atteint', emoji: '🎯', color: 'bg-green-100' },
      { name: '5kg perdus', emoji: '💪', color: 'bg-blue-100' }
    ];
  
    constructor(private router: Router) {}
  
    navigateToSettings() {
      this.router.navigate(['/settings']);
    }
  
    editPersonalInfo() {
      // Implement edit functionality (e.g., open a modal or navigate to edit page)
      console.log('Editing personal info');
    }
  
    editGoals() {
      // Implement edit functionality (e.g., open a modal or navigate to edit page)
      console.log('Editing goals');
    }
  }
  



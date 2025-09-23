export interface User {
  uid?: string;
  nom: string;
  prenom: string;
  email: string;
  password?: string; // Optionnel car retiré lors de l'enregistrement
  gender: 'male' | 'female';
  height: number;
  weight: number;
  activityLevel: 'none' | 'light' | 'moderate' | 'active' | 'very_active';
  goal: 'weight_loss' | 'weight_gain' | 'maintenance';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserProfile {
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

export interface Achievement {
  name: string;
  emoji: string;
  color: string;
}

export interface Meal {
  id: number; // Retour à number pour la version locale
  name: string;
  calories: number;
  protein: number;
  glucide: number;
  lipide: number;
  date: Date;
  timeSegment: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface Recipe {
  name: string;
  calories: number;
  protein: number;
  glucide: number;
  lipide: number;
}




export interface NutritionItem {
name: string;
value: string;
percentage: number;
color: string;
}


export interface Hydration {
  date: string;
  amountConsumed: number;
  dailyGoal: number;
}

export interface NewUser{
  id: number;
  name: string;
  role: string;
  profileImage: string;
  isFollowing: boolean;
  isLiked: boolean;
}export interface Follower {
  id: number;
  name: string;
  role: string;
  profileImage: string;
  isFollowing: boolean;
  isLiked: boolean;
}
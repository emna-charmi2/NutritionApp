import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Firestore,
  doc,
  getDoc,
  setDoc,
  docData,
} from '@angular/fire/firestore';
import { Timestamp } from 'firebase/firestore';
import { ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sugar-challenge',
  templateUrl: './sugar-challenge.component.html',
  styleUrls: ['./sugar-challenge.component.scss'],
  standalone:false,
})
export class SugarChallengeComponent implements OnInit, OnDestroy {
  sugarFreeDays = 0;
  points = 0;
  currentStreak = 0;
  lastMarkedDate: Date | null = null;
  loading = true;
  userId: string | undefined;
  showNotification = false;
  notificationMessage = '';
  subscription: Subscription | undefined;

  motivationMessages: string[] = [
    "Un jour de gagné !",
    "Excellente maîtrise !",
    "Continue comme ça !",
    "Tu es sur la bonne voie !",
    "Résistance impressionnante !",
    "Le sucre ne te contrôle pas !",
    "Courage, tu y es presque !",
    "Bravo pour ta détermination !",
    "Tu fais du bien à ton corps !",
    "L’habitude devient ta force !",
    "Tu inspires les autres !",
    "Tenir bon, c’est gagner !",
    "Plus que quelques jours !",
    "Tu es une vraie force !",
    "15 jours, c’est dans la poche !"
  ];
  currentMessage = '';

  constructor(
    private firestore: Firestore,
    private loginService: LoginService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    this.userId = await this.loginService.getCurrentUserId();
    if (this.userId) {
      this.loadChallengeData();
    } else {
      this.loading = false;
      this.presentToast("Erreur: Utilisateur non connecté");
    }
  }

  loadChallengeData() {
    const docRef = doc(this.firestore, 'noSugarChallenges', this.userId!);
    this.subscription = docData(docRef).subscribe({
      next: (data: any) => {
        if (data) {
          this.sugarFreeDays = data.sugarFreeDays || 0;
          this.points = data.points || 0;
          this.lastMarkedDate = data.lastMarkedDate?.toDate?.() || null;
          this.currentStreak = data.currentStreak || 0;

          this.updateMotivationMessage();
          this.loading = false;
        } else {
          this.initializeNewChallenge();
        }
      },
      error: (err) => {
        console.error("Erreur de chargement:", err);
        this.loading = false;
        this.presentToast("Erreur de chargement des données");
      }
    });
  }

  async initializeNewChallenge() {
    this.sugarFreeDays = 0;
    this.points = 0;
    this.currentStreak = 0;
    this.lastMarkedDate = null;

    await this.saveChallengeData();
    this.loading = false;
  }

  async markAsDone() {
    if (this.isTodayMarked()) return;

    this.loading = true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.sugarFreeDays++;
    this.lastMarkedDate = today;

    this.updateStreak();

    if (this.sugarFreeDays >= 15) {
      this.points += 10;
      this.sugarFreeDays = 0;
      this.notificationMessage = "Bravo ! +10 points pour ce challenge !";
      this.showNotification = true;
    }

    await this.saveChallengeData();
    this.updateMotivationMessage();
    this.loading = false;
  }

  async saveChallengeData() {
    try {
      const docRef = doc(this.firestore, 'noSugarChallenges', this.userId!);
      await setDoc(docRef, {
        sugarFreeDays: this.sugarFreeDays,
        points: this.points,
        lastMarkedDate: this.lastMarkedDate ? Timestamp.fromDate(this.lastMarkedDate) : null,
        currentStreak: this.currentStreak,
        lastUpdated: new Date()
      });
    } catch (error) {
      console.error("Erreur de sauvegarde:", error);
      this.presentToast("Erreur de sauvegarde des données");
    }
  }

  updateStreak() {
    if (!this.lastMarkedDate) {
      this.currentStreak = 1;
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastDate = new Date(this.lastMarkedDate);
    lastDate.setHours(0, 0, 0, 0);

    const diff = (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      this.currentStreak++;
    } else if (diff > 1) {
      this.currentStreak = 1;
    }
  }

  updateMotivationMessage() {
    const index = Math.min(this.currentStreak, this.motivationMessages.length - 1);
    this.currentMessage = this.motivationMessages[index];
  }

  isTodayMarked(): boolean {
    if (!this.lastMarkedDate) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const last = new Date(this.lastMarkedDate);
    last.setHours(0, 0, 0, 0);

    return today.getTime() === last.getTime();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: 'danger',
      position: 'top',
    });
    await toast.present();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
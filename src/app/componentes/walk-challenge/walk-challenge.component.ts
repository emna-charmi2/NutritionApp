import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  doc,
  getDoc,
  setDoc,
  docData,
} from '@angular/fire/firestore';
import { LoginService } from 'src/app/services/login.service';
import { ToastController } from '@ionic/angular';
import { Timestamp } from 'firebase/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-walk-challenge',
  templateUrl: './walk-challenge.component.html',
  styleUrls: ['./walk-challenge.component.scss'],
  standalone: false,
})
export class WalkChallengeComponent implements OnInit {
  walkDaysCount = 0;
  points = 0;
  currentStreak = 0;
  lastWalkDate: Date | null = null;
  showNotification = false;
  notificationMessage = '';
  showPulse = false;
  loading = true;
  userId: string | undefined;
  subscription: Subscription | undefined;

  motivationMessages: string[] = [
    "Bravo pour ce premier pas!",
    "Continuez comme ça!",
    "Vous êtes sur la bonne voie!",
    "La régularité est la clé!",
    "Vous allez atteindre votre objectif!",
    "Impressionnant!",
    "Ne lâchez rien!",
    "Vous êtes un champion!",
    "La persévérance paie!",
    "Quelle détermination!",
    "Vous inspirez les autres!",
    "Presque à mi-parcours!",
    "Vous êtes incroyable!",
    "Plus que quelques jours!",
    "Vous y êtes presque!",
    "Félicitations pour votre engagement!"
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
    const docRef = doc(this.firestore, 'walkChallenges', this.userId!);
    this.subscription = docData(docRef).subscribe({
      next: (data: any) => {
        if (data) {
          this.walkDaysCount = data.walkDaysCount || 0;
          this.points = data.points || 0;
          this.lastWalkDate = data.lastWalkDate?.toDate?.() || null;
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
    this.walkDaysCount = 0;
    this.points = 0;
    this.currentStreak = 0;
    this.lastWalkDate = null;

    await this.saveChallengeData();
    this.loading = false;
  }

  async markAsDone() {
    if (this.isTodayWalked()) return;

    this.loading = true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.walkDaysCount++;
    this.lastWalkDate = today;

    this.updateStreak();

    if (this.walkDaysCount >= 30) {
      this.points += 5;
      this.walkDaysCount = 0;
      this.notificationMessage = 'Félicitations! Vous avez gagné 5 points!';
      this.showNotification = true;
    }

    await this.saveChallengeData();
    this.updateMotivationMessage();
    this.triggerMessageAnimation();
    this.loading = false;
  }

  async saveChallengeData() {
    try {
      const docRef = doc(this.firestore, 'walkChallenges', this.userId!);
      await setDoc(docRef, {
        walkDaysCount: this.walkDaysCount,
        points: this.points,
        lastWalkDate: this.lastWalkDate ? Timestamp.fromDate(this.lastWalkDate) : null,
        currentStreak: this.currentStreak,
        lastUpdated: new Date(),
      });
    } catch (error) {
      console.error("Erreur de sauvegarde:", error);
      this.presentToast("Erreur de sauvegarde des données");
    }
  }

  updateStreak() {
    if (!this.lastWalkDate) {
      this.currentStreak = 1;
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastDate = new Date(this.lastWalkDate);
    lastDate.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      this.currentStreak++;
    } else if (diffDays > 1) {
      this.currentStreak = 1;
    }
  }

  updateMotivationMessage() {
    const index = Math.min(this.currentStreak, this.motivationMessages.length - 1);
    this.currentMessage = this.motivationMessages[index] || this.motivationMessages[0];
  }

  isTodayWalked(): boolean {
    if (!this.lastWalkDate) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastDate = new Date(this.lastWalkDate);
    lastDate.setHours(0, 0, 0, 0);

    return today.getTime() === lastDate.getTime();
  }

  triggerMessageAnimation() {
    this.showPulse = true;
    setTimeout(() => {
      this.showPulse = false;
    }, 1000);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: 'danger',
      position: 'top'
    });
    toast.present();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}

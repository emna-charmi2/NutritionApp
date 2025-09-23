import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ChallengeService } from 'src/app/services/challenge.service';
import { WalkChallengeComponent } from '../componentes/walk-challenge/walk-challenge.component';
@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.page.html',
  styleUrls: ['./challenges.page.scss'],
  standalone: false,
})
export class ChallengePage implements OnInit {
  totalPoints: number = 0;

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private challengeService: ChallengeService
  ) {}

  ngOnInit() {
    this.loadChallengeData();
  }

  loadChallengeData() {
    this.totalPoints = this.challengeService.getTotalPoints();
  }

  async showPointsMessage() {
    const toast = await this.toastCtrl.create({
      message: 'Collectez 20 points et gagnez un mois de suivi gratuit',
      duration: 3000,
      position: 'top',
      color: 'primary',
    });
    await toast.present();
  }

  enrollSugarChallenge() {
    this.challengeService.setCurrentChallenge('15-days-no-sugar');
    this.navCtrl.navigateForward('/no-sugar');
  }

  enrollWalkChallenge() {
    this.challengeService.setCurrentChallenge('walk-30-min-month');
    this.navCtrl.navigateForward('/walk-challenge');
  }

  enrollNoCigarettesAlcoholChallenge() {
    this.challengeService.setCurrentChallenge('15-days-no-cigarettes-alcohol');
    this.navCtrl.navigateForward('/challenge-details/15-days-no-cigarettes-alcohol');
  }

  enrollNoCoffeeVitaminCChallenge() {
    this.challengeService.setCurrentChallenge('15-days-no-coffee-vitamin-c');
    this.navCtrl.navigateForward('/challenge-details/15-days-no-coffee-vitamin-c');
  }

  enrollWakeUpChallenge() {
    this.challengeService.setCurrentChallenge('wake-up-at-5');
    this.navCtrl.navigateForward('/challenge-details/wake-up-at-5');
  }
}
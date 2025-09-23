import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Database, ref, child, get, onValue } from '@angular/fire/database';
import { Auth } from '@angular/fire/auth';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  dailyStats: any = {
    consumed: 555,
    target: 3000,
    weight: 55.5,
    steps: 9987,
    weightTrend: 5,
    stepsTrend: -10,
  };

  recentMeals: any[] = [];
  currentUserId: string = '';
  selectedDate: string = '';

  constructor(
    private navCtrl: NavController,
    private database: Database,
    private auth: Auth
  ) {}

  async ngOnInit() {
    const user = this.auth.currentUser;
    if (user) {
      this.currentUserId = user.uid;
      this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      this.fetchUserData();
    } else {
      console.warn("Utilisateur non connecté");
    }
  }

  fetchUserData() {
    const dbRef = ref(this.database);

    // Récupération des stats journalières
    get(child(dbRef, `users/${this.currentUserId}/dailyStats/${this.selectedDate}`)).then((snapshot) => {
      if (snapshot.exists()) {
        this.dailyStats = snapshot.val();
      } else {
        console.log("Aucune donnée pour dailyStats");
      }
    }).catch((error) => {
      console.error("Erreur dailyStats:", error);
    });

    // Récupération des repas récents
    onValue(child(dbRef, `users/${this.currentUserId}/recentMeals/${this.selectedDate}`), (snapshot) => {
      const data = snapshot.val();
      this.recentMeals = data ? Object.values(data) : [];
    });
  }

  navigateTo(route: string): void {
    this.navCtrl.navigateForward(route);
  }
}

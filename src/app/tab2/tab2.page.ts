import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { Auth } from '@angular/fire/auth'; // Import Firebase Auth

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {
  dailyStats: any = {
    consumed: 555,
    target: 3000,
    weight: 55.5,
    steps: 9987,
    weightTrend: 5,
    stepsTrend: -10,
  };

  currentUserId: string = '';
  selectedDate: string = '';

  constructor(
    private navCtrl: NavController,
    private auth: Auth
  ) {}

  async ngOnInit() {
    const user = this.auth.currentUser;
    if (user) {
      this.currentUserId = user.uid;
      this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    } else {
      console.warn('Utilisateur non connecté');
    }
  }


}

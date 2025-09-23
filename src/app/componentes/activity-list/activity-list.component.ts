import { Component,Input } from '@angular/core';
import { AwesomeCordovaNativePlugin } from '@awesome-cordova-plugins/core';
import { ToastController } from '@ionic/angular';
// Interface must be defined BEFORE the component that uses it
interface Activity {
  icon: string;
  title: string;
  value: string;
}

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss'],
  standalone: false,
  
})
export class ActivityListComponent {
  
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() value: string = '';

  activities: Activity[] = [
    { icon: 'walk', title: 'Walk', value: '2567 Steps' },
    { icon: 'moon', title: 'In Sleep', value: '8 Hours' },
    { icon: 'barbell', title: 'Workouts', value: '20 Minutes' },
    { icon: 'leaf', title: 'In Meditation', value: '10 Minutes' }
  ];
  steps: number = 0;
    workouts: number = 20;
    sleep: number = 8;
    meditation: number = 10;
    isLoading: boolean = false;
  
    constructor(
      private toastController: ToastController
    ) {}
  
  
}
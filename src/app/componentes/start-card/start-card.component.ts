import { Component, Input  } from '@angular/core';

@Component({
  selector: 'app-start-card',
  templateUrl: './start-card.component.html',
  styleUrls: ['./start-card.component.scss'],
  standalone:false,
})
export class StartCardComponent  {
  @Input() title!: string;
  @Input() value!: number | string;
  @Input() unit?: string;
  @Input() icon!: string; // Nom d'icône Ionicon (ex: 'flame', 'trending-up')
  @Input() trend?: {
    value: number;
    isPositive: boolean;
  };
  @Input() className?: string;
  @Input() gradient: boolean = false;
}
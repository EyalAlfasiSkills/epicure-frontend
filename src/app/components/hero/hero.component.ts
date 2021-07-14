import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  animations: [
    trigger('mountAnimation', [
      state('closed', style({
        transform: 'translateY(-20px)',
        opacity: 0
      })),
      state('open', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition('closed => open', [
        animate('0.5s ease')
      ]),
      transition('open => closed', [
        animate('0.5s ease')
      ]),
    ])
  ]
})
export class HeroComponent implements OnInit {

  constructor() { }

  isOpen = false

  ngOnInit(): void {
    setTimeout(() => {
      this.isOpen = true
    }, 100);
  }
}

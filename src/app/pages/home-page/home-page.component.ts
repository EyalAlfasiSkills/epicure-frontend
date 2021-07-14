import { Component, OnInit } from '@angular/core';
import { popularDishes, signatureDishes } from 'src/app/helpers';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  popularDishes = popularDishes
  signatureDishes = signatureDishes

  ngOnInit(): void {
  }

}

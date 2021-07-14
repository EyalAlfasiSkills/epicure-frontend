import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-icons-meaning',
  templateUrl: './icons-meaning.component.html',
  styleUrls: ['./icons-meaning.component.scss']
})
export class IconsMeaningComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  icons = [
    {
      iconUrl: '../../../assets/img/pepper-icon.svg',
      name: 'Spicy'
    },
    {
      iconUrl: '../../../assets/img/vegetarian-icon.svg',
      name: 'Vegitarian'
    },
    {
      iconUrl: '../../../assets/img/vegan-icon.svg',
      name: 'Vegan'
    },
  ]

}

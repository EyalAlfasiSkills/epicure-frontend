import { Component, Input, OnInit } from '@angular/core';
import { Dish } from './dish';

@Component({
  selector: 'app-dish-preview',
  templateUrl: './dish-preview.component.html',
  styleUrls: ['./dish-preview.component.scss']
})
export class DishPreviewComponent implements OnInit {

  @Input() dish: Dish | undefined
  @Input() dishType: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}

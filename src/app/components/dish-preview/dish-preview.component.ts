import { Component, Input, OnInit } from '@angular/core';
import { DishModel } from '../../models/dish/DishModel';

@Component({
  selector: 'app-dish-preview',
  templateUrl: './dish-preview.component.html',
  styleUrls: ['./dish-preview.component.scss']
})
export class DishPreviewComponent implements OnInit {

  @Input() dish: DishModel | undefined
  @Input() previewType: string = ''

  constructor() { }

  ngOnInit(): void {
  }

  get iconsPaths() {
    if (this.dish && this.dish.types) {
      return this.dish.types.map(type => {
        switch (type) {
          case 'spicy':
            return '../../../assets/img/pepper-icon.svg'
          case 'vegetarian':
            return '../../../assets/img/vegetarian-icon.svg'
          case 'vegan':
            return '../../../assets/img/vegan-icon.svg'
          default:
            return type
        }
      })
    }
    return null
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { RestaurantModel } from 'src/app/models/restaurant/RestaurantModel';

@Component({
  selector: 'app-restaurant-preview',
  templateUrl: './restaurant-preview.component.html',
  styleUrls: ['./restaurant-preview.component.scss']
})
export class RestaurantPreviewComponent implements OnInit {

  @Input() restaurant!: RestaurantModel
  @Input() previewType: string = ''


  constructor() { }

  ngOnInit(): void {
  }

}

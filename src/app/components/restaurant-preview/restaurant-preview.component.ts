import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant/Restaurant';

@Component({
  selector: 'app-restaurant-preview',
  templateUrl: './restaurant-preview.component.html',
  styleUrls: ['./restaurant-preview.component.scss']
})
export class RestaurantPreviewComponent implements OnInit {

  @Input() restaurant!: Restaurant
  @Input() previewType: string = ''


  constructor() { }

  ngOnInit(): void {
  }

}

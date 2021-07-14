import { Component, Input, OnInit } from '@angular/core';
import { Dish } from '../dish-preview/dish';
import SwiperCore, { Navigation, Swiper, Pagination } from 'swiper/core';
import { PaginationOptions } from 'swiper/types';
Navigation
@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.scss']
})
export class DishListComponent implements OnInit {

  constructor() { }
  @Input() title: string = ''
  @Input() listLinkText: string = ''
  @Input() dishType: string = ''
  @Input() dishes: Dish[] = []

  breakpoints = {
    480: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
  }

  pagination: PaginationOptions = {
    type: 'bullets',
    clickable: true
  }

  ngOnInit(): void {
    SwiperCore.use([Navigation, Pagination]);
  }


}

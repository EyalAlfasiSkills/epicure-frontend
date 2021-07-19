import { Component, Input, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/dish/Dish';
import { Restaurant } from 'src/app/models/restaurant/Restaurant';
import SwiperCore, { Navigation, Swiper, Pagination } from 'swiper/core';
import { PaginationOptions } from 'swiper/types';
Navigation
@Component({
  selector: 'app-preview-items-list',
  templateUrl: './preview-items-list.component.html',
  styleUrls: ['./preview-items-list.component.scss']
})
export class PreviewItemsListComponent implements OnInit {

  constructor() { }
  @Input() title: string = ''
  @Input() listLinkText: string = ''
  @Input() previewType: string = ''
  @Input() items: Restaurant[] | Dish[] | any = []

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

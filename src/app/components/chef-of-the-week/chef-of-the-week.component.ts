import { Component, OnInit } from '@angular/core';
import SwiperCore, { Navigation, Swiper, Pagination } from 'swiper/core';
import { PaginationOptions } from 'swiper/types';

@Component({
  selector: 'app-chef-of-the-week',
  templateUrl: './chef-of-the-week.component.html',
  styleUrls: ['./chef-of-the-week.component.scss']
})
export class ChefOfTheWeekComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    SwiperCore.use([Navigation, Pagination]);
  }

  restaurants = [
    {
      imgUrl: '../../../assets/img/onza.jpg',
      innerTitle: 'Onza'
    },
    {
      imgUrl: '../../../assets/img/kitchen-market.jpg',
      innerTitle: 'Kitchen Market'
    },
    {
      imgUrl: '../../../assets/img/mashya.jpg',
      innerTitle: 'Mashya'
    },
    {
      imgUrl: '../../../assets/img/onza.jpg',
      innerTitle: 'Onza'
    },
    {
      imgUrl: '../../../assets/img/kitchen-market.jpg',
      innerTitle: 'Kitchen Market'
    },
    {
      imgUrl: '../../../assets/img/mashya.jpg',
      innerTitle: 'Mashya'
    },
  ]

  breakpoints = {
    200: {
      slidesPerView: 1,
    },
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

}

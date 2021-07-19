import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant/Restaurant';
import { RestaurantService } from 'src/app/services/restaurant-service/restaurant.service';

@Component({
  selector: 'app-chef-of-the-week',
  templateUrl: './chef-of-the-week.component.html',
  styleUrls: ['./chef-of-the-week.component.scss']
})
export class ChefOfTheWeekComponent implements OnInit {

  restaurants: Restaurant[] = []

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.loadRestaurants()
  }

  loadRestaurants() {
    this.restaurantService.restaurants$.subscribe(restaurants => {
      if (restaurants) {
        const yossiRestaurants = restaurants.filter(restaurant => restaurant.chef?.name?.toLowerCase().includes('yossi'))
        console.log(yossiRestaurants);

        this.restaurants = yossiRestaurants
      }
    })
  }



}

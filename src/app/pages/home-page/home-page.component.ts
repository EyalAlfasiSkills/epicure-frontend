import { Component, OnInit } from '@angular/core';
import { popularDishes, signatureDishes } from 'src/app/helpers';
import { DishModel } from 'src/app/models/dish/DishModel';
import { RestaurantModel } from 'src/app/models/restaurant/RestaurantModel';
import { DishService } from 'src/app/services/dish-service/dish.service';
import { RestaurantService } from 'src/app/services/restaurant-service/restaurant.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  popularRestaurants: RestaurantModel[] = [];
  signatureDishes: DishModel[] = [];

  constructor(
    private restaurantService: RestaurantService,
    private dishService: DishService
  ) {

  }

  ngOnInit(): void {
    this.loadRestaurants()
    this.loadDishes()
  }

  loadRestaurants(): void {
    this.restaurantService.loadRestaurants()
    this.restaurantService.restaurants$.subscribe(restaurants => {
      if (restaurants.length) {
        this.popularRestaurants = restaurants.filter(restaurant => restaurant.isPopular)
      }
    }, (err) => {
      console.log(err);
    })
  }

  loadDishes(): void {
    this.dishService.loadDishes()
    this.dishService.dishes$.subscribe(dishes => {
      if (dishes.length) {
        this.signatureDishes = dishes
      }
    }, (err) => {
      console.log(err);
    })
  }

}

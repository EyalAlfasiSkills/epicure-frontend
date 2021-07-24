import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { TableType } from 'src/app/models/admin-table/TableType';
import { ChefModel } from 'src/app/models/chef/ChefModel';
import { DishModel } from 'src/app/models/dish/DishModel';
import { RestaurantModel } from 'src/app/models/restaurant/RestaurantModel';
import { ChefService } from 'src/app/services/chef-service/chef.service';
import { DishService } from 'src/app/services/dish-service/dish.service';
import { RestaurantService } from 'src/app/services/restaurant-service/restaurant.service';
import { ColumnModel } from 'src/app/models/admin-table/ColumnModel';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  constructor(
    private chefService: ChefService,
    private dishService: DishService,
    private restaurantService: RestaurantService,
    private fb: FormBuilder

  ) { }

  chefs: ChefModel[] | any = []
  dishes: DishModel[] | any = []
  restaurants: RestaurantModel[] | any = []

  currentTableType: TableType = "chef"

  isModalOpen = false;

  chefForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    about: [''],
    imgUrl: ['']
  })

  dishForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    ingredients: ['', Validators.required],
    price: [10, Validators.required],
    imgUrl: [''],
    types: this.fb.group({
      spicy: [false],
      vegan: [false],
      vegeterian: [false]
    })
  })

  restaurantForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    chef: [null, Validators.required],
    imgUrl: ['']
  })

  ngOnInit(): void {
    this.initializeTables()
  }

  initializeTables() {
    const allEntities$ = combineLatest([
      this.chefService.chefs$,
      this.dishService.dishes$,
      this.restaurantService.restaurants$
    ])
    allEntities$.subscribe(([chefs, dishes, restaurants]) => {
      console.log(this.chefService.formatChefsForAdminTable(chefs, { about: true, restaurants: true }));

      if (chefs) this.chefs = this.chefService.formatChefsForAdminTable(chefs, { about: true, restaurants: true })
      if (dishes) this.dishes = this.dishService.formatDishesForAdminTable(dishes, { restaurant: true, ingredients: true, price: true, types: true })
      if (restaurants) this.restaurants = this.restaurantService.formatRestaurantsForAdminTable(restaurants, { chef: true, dishes: true })
    }, (err) => {
      console.log(err);
    })
  }

  onOpenModal() {
    this.isModalOpen = true;
  }

  onCloseModal() {
    this.isModalOpen = false;
  }

  get currentTableItems() {
    switch (this.currentTableType) {
      case 'chef':
        return this.chefs
      case 'dish':
        return this.dishes
      case 'restaurant':
        return this.restaurants
      default:
        return []
    }
  }

  get currentTableHeader() {
    switch (this.currentTableType) {
      case 'chef':
        return ['Name', 'Restaurants', 'About', 'Actions']
      case 'dish':
        return ['Name', 'Restaurant', 'Types', 'Ingredients', 'Price', 'Actions']
      case 'restaurant':
        return ['Name', 'Head chef', 'Dishes', 'Actions']
      default:
        return []
    }
  }

  get currentForm() {
    switch (this.currentTableType) {
      case 'chef':
        return this.chefForm
      case 'dish':
        return this.dishForm
      case 'restaurant':
        return this.restaurantForm
      default:
        return this.chefForm
    }

  }

  onFormSubmit() {
    switch (this.currentTableType) {
      case 'chef':
        this.onAddChef()
        break
      case 'dish':
        console.log(this.dishForm);
        break
      case 'restaurant':
        console.log(this.restaurantForm);
        break
      default:
        break
    }
  }

  onAddChef() {
    const formData = this.chefForm.value
    this.chefService.addChef(formData, () => {
      this.onCloseModal()
    })
  }

  onDeleteItem(itemId: any) {
    const confirmation = confirm(`Are you sure you want to delete this ${this.currentTableType}?`)
    if (confirmation) {
      this.chefService.deleteChef(itemId)
    }
  }
}
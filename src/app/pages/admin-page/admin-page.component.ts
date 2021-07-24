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
import { ActivatedRoute } from '@angular/router';
import { FormattedTableEntity } from 'src/app/models/admin-table/FormattedTableEntity';
import { FormatService } from 'src/app/services/format-service/format.service';

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
    private formatService: FormatService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute

  ) {
    this.currentTableType = this.activatedRoute.snapshot.data.table
  }

  // chefs: ChefModel[] | any = []
  // dishes: DishModel[] | any = []
  // restaurants: RestaurantModel[] | any = []


  entities: { chef: FormattedTableEntity[], dish: FormattedTableEntity[], restaurant: FormattedTableEntity[] } = {
    chef: [],
    dish: [],
    restaurant: []
  }

  currentTableType: TableType

  isModalOpen = false;

  editForms = {
    chef: this.fb.group({
      name: ['', Validators.required],
      about: [''],
      imgUrl: ['']
    })
    ,
    dish: this.fb.group({
      name: ['', Validators.required],
      ingredients: ['', Validators.required],
      price: [10, Validators.required],
      imgUrl: [''],
      types: this.fb.group({
        spicy: [false],
        vegan: [false],
        vegeterian: [false]
      })
    }),

    restaurant: this.fb.group({
      name: ['', Validators.required],
      chef: [null, Validators.required],
      imgUrl: ['']
    })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ entity }) => {
      console.log(entity);

      this.currentTableType = entity
    })
    this.initializeTables()
  }

  initializeTables() {
    const allEntities$ = combineLatest([
      this.chefService.chefs$,
      this.dishService.dishes$,
      this.restaurantService.restaurants$
    ])
    allEntities$.subscribe(([chefs, dishes, restaurants]) => {
      const formattedChefs = this.formatService.formatChefsForAdminTable(chefs, { about: true, restaurants: true })
      const formattedDishes = this.formatService.formatChefsForAdminTable(dishes, { restaurant: true, ingredients: true, price: true, types: true })
      const formattedRestaurants = this.formatService.formatChefsForAdminTable(restaurants, { chef: true, dishes: true })
      this.entities = {
        chef: formattedChefs,
        dish: formattedDishes,
        restaurant: formattedRestaurants
      }
    }, (err) => {
      console.log(err);
    })
  }

  onOpenModal() {
    this.isModalOpen = true;
  }

  onCloseModal() {
    this.isModalOpen = false;
    this.editForms[this.currentTableType].reset()
  }

  get currentTableItems() {
    return this.entities[this.currentTableType]
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
    return this.editForms[this.currentTableType]
  }

  onFormSubmit() {
    switch (this.currentTableType) {
      case 'chef':
        this.onAddChef()
        break
      case 'dish':
        console.log(this.editForms.dish);
        break
      case 'restaurant':
        console.log(this.editForms.restaurant);
        break
      default:
        break
    }
  }

  onAddChef() {
    const formData = this.editForms.chef.value
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
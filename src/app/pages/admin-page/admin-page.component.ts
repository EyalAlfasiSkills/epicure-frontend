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

  ) { }

  entities: any = {
    chef: [],
    dish: [],
    restaurant: []
  }

  currentTableType!: TableType

  entityToEditId: string = ''

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
      restaurant: [null, Validators.required],
      idSignature: false,
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
      this.currentTableType = entity
    })
    this.initializeTables()
  }

  initializeTables() {
    this.chefService.loadChefs()
    this.dishService.loadDishes()
    this.restaurantService.loadRestaurants()
    const allEntities$ = combineLatest([
      this.chefService.chefs$,
      this.dishService.dishes$,
      this.restaurantService.restaurants$
    ])
    allEntities$.subscribe(([chefs, dishes, restaurants]) => {
      this.entities = {
        chef: chefs,
        dish: dishes,
        restaurant: restaurants
      }
    }, (err) => {
      console.log(err);
    })
  }

  onRefreshTables() {
    window.location.reload();
  }

  onOpenModal(entityId?: any) {
    if (entityId) {
      this.entityToEditId = entityId
      const entity = this.entities[this.currentTableType].find((item: any) => item._id === entityId)
      const formattedEntity = this.formatService.formatItemForEdit(entity, this.currentTableType)
      this.currentForm.setValue(formattedEntity)
    }
    this.isModalOpen = true;
  }

  onCloseModal() {
    this.isModalOpen = false;
    this.entityToEditId = ''
    this.editForms[this.currentTableType].reset()
  }

  get currentTableItems() {
    // let filters
    // switch (this.currentTableType) {
    //   case 'chef':
    //     filters = { about: true, restaurants: true }
    //     break;
    //   case 'dish':
    //     filters = { restaurant: true, ingredients: true, price: true, types: true }
    //     break;
    //   case 'restaurant':
    //     filters = { chef: true, dishes: true }
    //     break;
    //   default:
    //     break;
    // }
    // return this.formatService.formatChefsForAdminTable(this.entities[this.currentTableType], filters)
    return this.entities[this.currentTableType]
  }

  get currentTableHeader() {
    switch (this.currentTableType) {
      case 'chef':
        return ['Name', 'About', 'Restaurants', 'Actions']
      case 'dish':
        return ['Name', 'Restaurant', 'Ingredients', 'Price', 'Types', 'Actions']
      case 'restaurant':
        return ['Name', 'Head chef', 'Dishes', 'Actions']
      default:
        return []
    }
  }

  get currentForm() {
    return this.editForms[this.currentTableType]
  }

  onDeleteItem(itemId: any) {
    const confirmation = confirm(`Are you sure you want to delete this ${this.currentTableType}?`)
    if (confirmation) {
      switch (this.currentTableType) {
        case 'chef':
          this.chefService.deleteChef(itemId)
          break;
        case 'dish':
          this.dishService.deleteDish(itemId)
          break;
        case 'restaurant':
          this.restaurantService.deleteRestaurant(itemId)
          break;
        default:
          break;
      }
    }
  }
}
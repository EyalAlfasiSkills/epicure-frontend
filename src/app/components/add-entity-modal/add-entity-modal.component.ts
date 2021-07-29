import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormattedTableEntity } from 'src/app/models/admin-table/FormattedTableEntity';
import { TableType } from 'src/app/models/admin-table/TableType';
import { ChefModel } from 'src/app/models/chef/ChefModel';
import { DishModel } from 'src/app/models/dish/DishModel';
import { RestaurantModel } from 'src/app/models/restaurant/RestaurantModel';
import { ChefService } from 'src/app/services/chef-service/chef.service';
import { DishService } from 'src/app/services/dish-service/dish.service';
import { RestaurantService } from 'src/app/services/restaurant-service/restaurant.service';

@Component({
  selector: 'app-add-entity-modal',
  templateUrl: './add-entity-modal.component.html',
  styleUrls: ['./add-entity-modal.component.scss']
})
export class AddEntityModalComponent implements OnInit {

  @Input() isOpen: boolean = false
  @Input() formType!: TableType
  @Input() form!: FormGroup
  @Input() entities!: { chef: FormattedTableEntity[], dish: FormattedTableEntity[], restaurant: FormattedTableEntity[] }
  @Input() entityId!: string
  @Output() closeModal = new EventEmitter()
  @Output() formSubmit = new EventEmitter()

  constructor(
    private chefService: ChefService,
    private dishService: DishService,
    private restaurantService: RestaurantService,
  ) { }

  ngOnInit(): void {
  }

  onFormSubmit() {
    const formData = this.form.value
    if (this.entityId) {
      formData._id = this.entityId
    }
    switch (this.formType) {
      case 'chef':
        this.onSaveChef(formData)
        break
      case 'dish':
        this.onSaveDish(formData)
        break
      case 'restaurant':
        this.onSaveRestaurant(formData)
        break
      default:
        break
    }
  }

  onSaveChef(formData: ChefModel) {
    if (formData) {
      this.chefService.saveChef(formData, () => {
        this.onCloseModal()
      })
    }
  }

  onSaveDish(formData: DishModel | any) {
    const formattedTypes = Object.keys(formData.types)
    formData.types = formattedTypes.filter(type => Boolean(formData.types[type]))
    if (formData) {
      this.dishService.saveDish(formData, () => {
        this.onCloseModal()
      })
    }
  }

  onSaveRestaurant(formData: RestaurantModel) {
    this.restaurantService.saveRestaurant(formData, () => {
      this.onCloseModal()
    })
  }

  onCloseModal() {
    this.closeModal.emit()
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormattedTableEntity } from 'src/app/models/admin-table/FormattedTableEntity';
import { TableType } from 'src/app/models/admin-table/TableType';
import { ChefModel } from 'src/app/models/chef/ChefModel';
import { DishModel } from 'src/app/models/dish/DishModel';
import { RestaurantModel } from 'src/app/models/restaurant/RestaurantModel';

@Component({
  selector: 'app-add-entity-modal',
  templateUrl: './add-entity-modal.component.html',
  styleUrls: ['./add-entity-modal.component.scss']
})
export class AddEntityModalComponent implements OnInit {

  @Input() isOpen: boolean = false
  @Input() formType!: TableType
  @Input() form!: FormGroup
  @Input() items!: FormattedTableEntity[] 
  @Output() closeModal = new EventEmitter()
  @Output() formSubmit = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onCloseModal() {
    this.closeModal.emit()
  }

  onFormSubmit() {
    this.formSubmit.emit()
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableType } from 'src/app/models/admin-table/TableType';
import { ChefModel } from 'src/app/models/chef/ChefModel';
import { DishModel } from 'src/app/models/dish/DishModel';
import { RestaurantModel } from 'src/app/models/restaurant/RestaurantModel';

@Component({
  selector: 'app-admin-table-row',
  templateUrl: './admin-table-row.component.html',
  styleUrls: ['./admin-table-row.component.scss']
})
export class AdminTableRowComponent implements OnInit {

  @Input() tableType!: TableType
  @Input() item!: ChefModel | DishModel | RestaurantModel | any;
  @Output() deleteItem = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
    // console.log(this.item);
    
  }

  onDeleteItem() {
    this.deleteItem.emit(this.item._id)
  }

}

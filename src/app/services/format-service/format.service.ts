import { Injectable } from '@angular/core';
import { ColumnModel } from 'src/app/models/admin-table/ColumnModel';
import { ChefModel } from 'src/app/models/chef/ChefModel';
import { DishModel } from 'src/app/models/dish/DishModel';
import { RestaurantModel } from 'src/app/models/restaurant/RestaurantModel';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  constructor() { }

  formatChefsForAdminTable(entities: ChefModel[] | DishModel[] | RestaurantModel[], propertiesToInclude: any) {
    return entities.map((entity: ChefModel | DishModel | RestaurantModel) => {
      const newEntity: {
        _id: string,
        columns: ColumnModel[],
        name: string,
        imgUrl: string
      } = {
        _id: entity._id,
        columns: [],
        name: entity.name,
        imgUrl: entity.imgUrl
      }
      const entityColumns = Object.entries(entity).reduce((acc: ColumnModel[], [key, value]: [key: string, value: any]): ColumnModel[] => {
        if (Boolean(propertiesToInclude[key])) {
          let columnName = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()
          let columnType = 'text';
          let columnValue = value;
          if (Array.isArray(value)) {
            if (this.checkIsArrayOfObjects(value)) {
              columnValue = value.map((entityValue: ChefModel | DishModel | RestaurantModel) => entityValue.name).join(', ')
            } else if (this.checkIsArrayOfStrings(value)) {
              columnValue = value.join(', ')
            }
          }
          if (this.checkIsObjectLiteral(value)) {
            
            if (key === 'price') {
              console.log(this.checkIsObjectLiteral(value));
              console.log(value);
  
            }
            columnValue = value?.name || ''
          }
          
          const column: ColumnModel = {
            columnName,
            columnType,
            columnValue
          }
          acc.push(column)
          return acc
        }
        return acc
      }, [])
      newEntity.columns = entityColumns
      return newEntity
    })
  }


  checkIsObjectLiteral(value: any) {
    return !Array.isArray(value) && typeof value === 'object'
  }
  checkIsArrayOfStrings(arr: any[]) {
    return arr.every(value => typeof value === 'string')
  }

  checkIsArrayOfObjects(arr: any[]) {
    return arr.every(value => typeof value === 'object')
  }
}

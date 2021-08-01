import { Injectable } from '@angular/core';
import { ColumnModel } from 'src/app/models/admin-table/ColumnModel';
import { TableType } from 'src/app/models/admin-table/TableType';
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

  formatItemForEdit(item: any, type: TableType): any {
    let newItem
    switch (type) {
      case 'chef':
        newItem = {
          name: item.name,
          about: item.about,
          imgUrl: item.imgUrl,
        }
        break;
      case 'dish':
        newItem = {
          name: item.name,
          ingredients: item.ingredients,
          price: item.price,
          imgUrl: item.imgUrl,
          restaurant: item.restaurant,
          idSignature: false,
          types: {
            spicy: Boolean(item.types.includes('spicy')),
            vegan: Boolean(item.types.includes('vegan')),
            vegeterian: Boolean(item.types.includes('vegeterian'))
          }
        }
        break;
      case 'restaurant':
        newItem = {
          name: item.name,
          chef: item.chef || null,
          imgUrl: item.imgUrl,
        }
        break;
      default:
        break;
    }
    return newItem
  }

  private checkIsObjectLiteral(value: any) {
    return !Array.isArray(value) && typeof value === 'object'
  }
  private checkIsArrayOfStrings(arr: any[]) {
    return arr.every(value => typeof value === 'string')
  }

  private checkIsArrayOfObjects(arr: any[]) {
    return arr.every(value => typeof value === 'object')
  }
}

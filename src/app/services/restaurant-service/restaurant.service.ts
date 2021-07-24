import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { RestaurantModel } from 'src/app/models/restaurant/RestaurantModel';
import { ColumnModel } from 'src/app/models/admin-table/ColumnModel';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private BASE_URL = 'http://localhost:3030/api/restaurant';

  private restaurantsSubject: BehaviorSubject<RestaurantModel[]> = new BehaviorSubject<RestaurantModel[]>([])
  public restaurants$: Observable<RestaurantModel[]> = this.restaurantsSubject.asObservable()


  constructor(private http: HttpClient) { }

  loadRestaurants(): void {
    this.http.get<RestaurantModel[]>(this.BASE_URL).pipe(
      tap(restaurants => {
        if (restaurants) {
          this.restaurantsSubject.next(restaurants)
        }
      })
    ).subscribe(res => 'Fetched successfully')
  }

  // formatRestaurantsForAdminTa(restaurants: RestaurantModel[], propertiesToInclude: any) {
  //   return restaurants.map((restaurant) => {
  //     const newRestaurant: {
  //       _id: string,
  //       columns: ColumnModel[],
  //       name: any,
  //       imgUrl: any
  //     } = {
  //       _id: restaurant._id,
  //       columns: [],
  //       name: restaurant.name,
  //       imgUrl: restaurant.imgUrl
  //     }
  //     const restaurantColumns = Object.entries(restaurant).reduce((acc: ColumnModel[], [key, value]: [key: string, value: any]): ColumnModel[] => {
  //       if (Boolean(propertiesToInclude[key])) {
  //         let columnName = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()
  //         let columnType = 'text';
  //         let columnValue = value;
  //         switch (key) {
  //           case 'chef':
  //             columnValue = value?.name || ''
  //             break;
  //           case 'dishes':
  //             columnValue = value.map((rest: any) => rest.name).join(', ')
  //             break;

  //           default:
  //             break;
  //         }
  //         const column: ColumnModel = {
  //           columnName,
  //           columnType,
  //           columnValue
  //         }
  //         acc.push(column)
  //         return acc
  //       }
  //       return acc
  //     }, [])
  //     newRestaurant.columns = restaurantColumns
  //     return newRestaurant
  //   })
  // }

  formatRestaurantsForAdminTable(restaurants: RestaurantModel[], propertiesToInclude: any) {
    return restaurants.map((restaurant) => {
      const newRestaurant: {
        _id: string,
        columns: ColumnModel[],
        name: string,
        imgUrl: string
      } = {
        _id: restaurant._id,
        columns: [],
        name: restaurant.name,
        imgUrl: restaurant.imgUrl
      }
      const chefColumns = Object.entries(restaurant).reduce((acc: ColumnModel[], [key, value]: [key: string, value: any]): ColumnModel[] => {
        if (Boolean(propertiesToInclude[key])) {
          let columnName = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()
          let columnType = 'text';
          let columnValue = value;
          if (key === 'dishes') {
            columnValue = value.map((dish: any) => dish.name).join(', ')
          } else if (key === 'chef') {
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
      newRestaurant.columns = chefColumns
      return newRestaurant
    })
  }
}

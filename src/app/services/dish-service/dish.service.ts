import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { ColumnModel } from 'src/app/models/admin-table/ColumnModel';
import { DishModel } from 'src/app/models/dish/DishModel';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private BASE_URL = 'http://localhost:3030/api/dish';

  private dishesSubject: BehaviorSubject<DishModel[]> = new BehaviorSubject<DishModel[]>([])
  public dishes$: Observable<DishModel[]> = this.dishesSubject.asObservable()


  constructor(private http: HttpClient) { }

  loadDishes(): void {
    this.http.get<DishModel[]>(this.BASE_URL).pipe(
      // map(dish => dish.filter(dish => dish.isSignature)),
      tap(dishes => {
        if (dishes) {
          this.dishesSubject.next(dishes)
        }
      })
    ).subscribe(res => 'Fetched successfully')
  }

  formatDishesForAdminTable(dishes: DishModel[], propertiesToInclude: any) {
    return dishes.map((dish) => {
      // const newDish: { _id: string, columns: ColumnModel[] } = { _id: dish._id, columns: [] }
      const newDish: {
        _id: string,
        columns: ColumnModel[],
        name: string,
        imgUrl: string
      } = {
        _id: dish._id,
        columns: [],
        name: dish.name,
        imgUrl: dish.imgUrl
      }
      const dishColumns = Object.entries(dish).reduce((acc: ColumnModel[], [key, value]: [key: string, value: any]): ColumnModel[] => {
        if (Boolean(propertiesToInclude[key])) {
          let columnName = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()
          let columnType = 'text';
          let columnValue = value;
          switch (key) {
            case 'imgUrl':
              columnType = 'img'
              break;
            case 'restaurant':
              columnValue = value?.name || ''
              break;
            case 'types':
              columnValue = value.join(', ')
              break;

            default:
              break;
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
      newDish.columns = dishColumns
      return newDish
    })
  }
}

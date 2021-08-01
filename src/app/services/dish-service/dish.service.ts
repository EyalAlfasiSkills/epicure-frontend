import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { ColumnModel } from 'src/app/models/admin-table/ColumnModel';
import { DishModel } from 'src/app/models/dish/DishModel';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private BASE_URL = 'http://localhost:3000/api/dish';

  private dishesSubject: BehaviorSubject<DishModel[]> = new BehaviorSubject<DishModel[]>([])
  public dishes$: Observable<DishModel[]> = this.dishesSubject.asObservable()


  constructor(private http: HttpClient) { }

  refreshTable() {
    window.location.reload();
  }

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

  saveDish(dishData: DishModel, cb?: Function) {
    this.http.post<DishModel>(this.BASE_URL, dishData).pipe(
      take(1)
    ).subscribe(newDish => {
      if (newDish) {
        // const newDishes = [...this.dishesSubject.getValue(), newDish]
        // this.dishesSubject.next(newDishes)
        this.refreshTable()
        if (cb) cb()
      }
    }, (err) => {
      console.log(err);
    })
  }

  deleteDish(dishId: string, cb?: Function) {
    this.http.delete<DishModel>(`${this.BASE_URL}/${dishId}`).pipe(
      take(1)
    ).subscribe(success => {
      if (success) {
        // const newDishes = this.dishesSubject.getValue().filter((dish: DishModel) => dish._id !== dishId)
        // this.dishesSubject.next(newDishes)
        this.refreshTable()
        if (cb) cb()
      }
    }, (err) => {
      console.log(err);
    })
  }
}

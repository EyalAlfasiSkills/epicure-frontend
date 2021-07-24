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
}

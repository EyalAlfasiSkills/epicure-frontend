import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Dish } from 'src/app/models/dish/Dish';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private BASE_URL = 'http://localhost:3030/api/dish';

  private dishesSubject: BehaviorSubject<Dish[]> = new BehaviorSubject<Dish[]>([])
  public dishes$: Observable<Dish[]> = this.dishesSubject.asObservable()


  constructor(private http: HttpClient) { }

  loadDishes(): void {
    this.http.get<Dish[]>(this.BASE_URL).pipe(
      map(dish => dish.filter(dish => dish.isSignature)),
      tap(dishes => {
        if (dishes) {
          this.dishesSubject.next(dishes)
        }
      })
    ).subscribe(res => 'Fetched successfully')
  }
}

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
  
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators'
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

  refreshTable() {
    window.location.reload();
  }

  loadRestaurants(): void {
    this.http.get<RestaurantModel[]>(this.BASE_URL).pipe(
      tap(restaurants => {
        if (restaurants) {          
          this.restaurantsSubject.next(restaurants)
        }
      })
    ).subscribe(res => 'Fetched successfully')
  }

  saveRestaurant(restaurantData: RestaurantModel, cb?: Function) {
    this.http.post<RestaurantModel>(this.BASE_URL, restaurantData).pipe(
      take(1)
    ).subscribe(newRestaurant => {
      if (newRestaurant) {
        // const newRestaurants = [...this.restaurantsSubject.getValue(), newRestaurant]
        // this.restaurantsSubject.next(newRestaurants)
        this.refreshTable()
        if (cb) cb()
      }
    }, (err) => {
      console.log(err);
    })
  }

  deleteRestaurant(restaurantId: string, cb?: Function) {
    this.http.delete<RestaurantModel>(`${this.BASE_URL}/${restaurantId}`).pipe(
      take(1)
    ).subscribe(success => {
      if (success) {
        // const newRestaurants = this.restaurantsSubject.getValue().filter((restaurant: RestaurantModel) => restaurant._id !== restaurantId)
        // this.restaurantsSubject.next(newRestaurants)
        this.refreshTable()
        if (cb) cb()
      }
    }, (err) => {
      console.log(err);
    })
  }
}

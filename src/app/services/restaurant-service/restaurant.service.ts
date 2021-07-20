import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { Restaurant } from 'src/app/models/restaurant/Restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private BASE_URL = 'http://localhost:3030/api/restaurant';

  private restaurantsSubject: BehaviorSubject<Restaurant[]> = new BehaviorSubject<Restaurant[]>([])
  public restaurants$: Observable<Restaurant[]> = this.restaurantsSubject.asObservable()


  constructor(private http: HttpClient) { }

  loadRestaurants(): void {
    this.http.get<Restaurant[]>(this.BASE_URL).pipe(
      tap(restaurants => {
        if (restaurants) {
          this.restaurantsSubject.next(restaurants)
        }
      })
    ).subscribe(res => 'Fetched successfully')
  }
}

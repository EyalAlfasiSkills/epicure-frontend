import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chef } from 'src/app/models/chef/Chef';
import { ChefOfTheWeek } from 'src/app/models/chef/ChefOfTheWeek';

@Injectable({
  providedIn: 'root'
})
export class ChefService {

  private BASE_URL = 'http://localhost:3030/api/chef';

  constructor(private http: HttpClient) { }

  get chefOfTheWeek(): Observable<Chef> {
    return this.http.get<Chef>(`${this.BASE_URL}/chef-of-the-week`)
  }

}
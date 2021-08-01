import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, shareReplay, take, tap } from 'rxjs/operators';
import { ColumnModel } from 'src/app/models/admin-table/ColumnModel';
import { ChefModel } from 'src/app/models/chef/ChefModel';
import { ChefOfTheWeek } from 'src/app/models/chef/ChefOfTheWeek';

@Injectable({
  providedIn: 'root'
})
export class ChefService {

  private BASE_URL = 'http://localhost:3000/api/chef';

  private chefsSubject: BehaviorSubject<ChefModel[]> = new BehaviorSubject<ChefModel[]>([])
  public chefs$: Observable<ChefModel[]> = this.chefsSubject.asObservable()

  constructor(private http: HttpClient) { }

  get chefOfTheWeek(): Observable<ChefModel> {
    return this.http.get<ChefModel>(`${this.BASE_URL}/chef-of-the-week`)
  }

  refreshTable() {
    window.location.reload();
  }

  loadChefs(): void {
    this.http.get<ChefModel[]>(this.BASE_URL).pipe(
      tap(chefs => {
        if (chefs) {
          this.chefsSubject.next(chefs)
        }
      }),
    ).subscribe(res => 'Fetched successfully')
  }

  saveChef(chefData: ChefModel, cb?: Function) {
    this.http.post<ChefModel>(this.BASE_URL, chefData).pipe(
      take(1)
    ).subscribe(newChef => {
      if (newChef) {
        // const newChefs = [...this.chefsSubject.getValue(), newChef]
        // this.chefsSubject.next(newChefs)
        this.refreshTable()
        if (cb) cb()
      }
    }, (err) => {
      console.log(err);
    })
  }

  deleteChef(chefId: string, cb?: Function) {
    this.http.delete<ChefModel>(`${this.BASE_URL}/${chefId}`).pipe(
      take(1)
    ).subscribe(success => {
      if (success) {
        // const newChefs = this.chefsSubject.getValue().filter((chef: ChefModel) => chef._id !== chefId)
        // this.chefsSubject.next(newChefs)
        this.refreshTable()
        if (cb) cb()
      }
    }, (err) => {
      console.log(err);
    })
  }
}
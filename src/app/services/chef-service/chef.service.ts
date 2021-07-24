import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, take, tap } from 'rxjs/operators';
import { ColumnModel } from 'src/app/models/admin-table/ColumnModel';
import { ChefModel } from 'src/app/models/chef/ChefModel';
import { ChefOfTheWeek } from 'src/app/models/chef/ChefOfTheWeek';

@Injectable({
  providedIn: 'root'
})
export class ChefService {

  private BASE_URL = 'http://localhost:3030/api/chef';

  private chefsSubject: BehaviorSubject<ChefModel[]> = new BehaviorSubject<ChefModel[]>([])
  public chefs$: Observable<ChefModel[]> = this.chefsSubject.asObservable()

  constructor(private http: HttpClient) { }

  get chefOfTheWeek(): Observable<ChefModel> {
    return this.http.get<ChefModel>(`${this.BASE_URL}/chef-of-the-week`)
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

  formatChefsForAdminTable(chefs: ChefModel[], propertiesToInclude: any) {
    return chefs.map((chef) => {
      const newChef: {
        _id: string,
        columns: ColumnModel[],
        name: string,
        imgUrl: string
      } = {
        _id: chef._id,
        columns: [],
        name: chef.name,
        imgUrl: chef.imgUrl
      }
      const chefColumns = Object.entries(chef).reduce((acc: ColumnModel[], [key, value]: [key: string, value: any]): ColumnModel[] => {
        if (Boolean(propertiesToInclude[key])) {
          let columnName = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()
          let columnType = 'text';
          let columnValue = value;
          if (key === 'restaurants') {
            columnValue = value.map((rest: any) => rest.name).join(', ')
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
      newChef.columns = chefColumns
      return newChef
    })
  }

  addChef(chefData: ChefModel, cb?: Function) {
    this.http.post<ChefModel>(this.BASE_URL, chefData).pipe(
      take(1)
    ).subscribe(newChef => {
      if (newChef) {
        const newChefs = [...this.chefsSubject.getValue(), newChef]
        this.chefsSubject.next(newChefs)
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
        const newChefs = this.chefsSubject.getValue().filter((chef: ChefModel) => chef._id !== chefId)
        this.chefsSubject.next(newChefs)
        if (cb) cb()
      }
    }, (err) => {
      console.log(err);
    })
  }
}
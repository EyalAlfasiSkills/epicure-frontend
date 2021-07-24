import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { SearchResults } from 'src/app/models/search-results/SearchResults';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private BASE_URL = 'http://localhost:3030/api/search';

  // searchResultsSubject: BehaviorSubject<SearchResults> = new BehaviorSubject<any>(null)
  // searchResults$: Observable<SearchResults> = this.searchResultsSubject.asObservable()


  constructor(private http: HttpClient) { }

  fetchSearchResults(searchStr: string): Observable<SearchResults> {
    return this.http.get<SearchResults>(`${this.BASE_URL}/all/?searchStr=${searchStr}`).pipe(
      take(1),
    )
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Credentials } from 'src/app/models/user/Credentials';
import { SuccessfulLoginObject } from 'src/app/models/user/SuccessfulLoginObject';
import { User } from 'src/app/models/user/User';
import { StorageService } from '../storage-service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = 'http://localhost:3030/api/auth';
  private TOKEN_STORAGE_KEY = "Token_DB"

  private loggedInUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null)
  public loggedInUser$: Observable<User | null> = this.loggedInUserSubject.asObservable()

  constructor(
    private http: HttpClient,
    private storage: StorageService<string>
  ) { }

  login(credentials: Credentials): Observable<SuccessfulLoginObject> {
    console.log(credentials);

    return this.http.post<SuccessfulLoginObject>(`${this.BASE_URL}/login`, credentials).pipe(
      tap(({ user, accessToken }) => {
        if (user && accessToken) {
          this.storage.save(this.TOKEN_STORAGE_KEY, accessToken)
          this.loggedInUserSubject.next(user)
        }
      })
    )
  }

  getToken() {
    return this.storage.load(this.TOKEN_STORAGE_KEY)
  }
}

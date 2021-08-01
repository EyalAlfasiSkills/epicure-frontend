import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Credentials } from 'src/app/models/user/Credentials';
import { SuccessfulLoginObject } from 'src/app/models/user/SuccessfulLoginObject';
import { User } from 'src/app/models/user/User';
import { SessionStorageService } from '../session-storage-service/session-storage.service';
import { StorageService } from '../storage-service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = 'http://localhost:3000/api/auth';
  private ACCESS_TOKEN_STORAGE_KEY = "ACCESS_TOKEN_DB"
  private REFRESH_TOKEN_STORAGE_KEY = "REFRESH_TOKEN_DB"
  private LOGGED_IN_USER_SESSION_KEY = "LOGGED_IN_USER"

  constructor(
    private http: HttpClient,
    private storage: StorageService<string>,
    private session: SessionStorageService<User | null>
  ) { }

  login(credentials: Credentials): Observable<SuccessfulLoginObject> {
    console.log(credentials);

    return this.http.post<SuccessfulLoginObject>(`${this.BASE_URL}/login`, credentials).pipe(
      tap((userData) => {
        console.log(userData);
        const { accessToken, refreshToken, idToken } = userData.response.token
        if (userData.response.token.accessToken) {
          this.setAccessToken(accessToken)
          this.setRefreshToken(refreshToken)
        }
      })
    )
  }

  get isLoggedIn(): boolean {
    const authToken = this.getAccessToken()
    return Boolean(authToken)
  }

  setAccessToken(token: string) {
    return this.storage.save(this.ACCESS_TOKEN_STORAGE_KEY, token)
  }

  setRefreshToken(token: string) {
    return this.storage.save(this.REFRESH_TOKEN_STORAGE_KEY, token)
  }

  getAccessToken() {
    return this.storage.load(this.ACCESS_TOKEN_STORAGE_KEY)
  }

  getRefreshToken() {
    return this.storage.load(this.REFRESH_TOKEN_STORAGE_KEY)
  }
}

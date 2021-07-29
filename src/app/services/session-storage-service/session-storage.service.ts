import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService<T> {

  constructor() { }

  save(key: string, value: T) {
    sessionStorage.setItem(key, JSON.stringify(value))
  }

  load(key: string): T {
    const item = sessionStorage.getItem(key)
    return item ? JSON.parse(item) : null
  }
}

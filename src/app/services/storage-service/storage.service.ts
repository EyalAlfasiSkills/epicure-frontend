import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService<T> {

  constructor() { }

  save(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  load(key: string): T {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  }
}

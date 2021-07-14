import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {

  }

  get isMobile() {
    const { userAgent } = navigator
    return userAgent.toLowerCase().includes('mobile')
  }

}
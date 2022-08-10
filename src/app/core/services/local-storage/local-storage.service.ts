import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  setData(key: string, value: string): boolean {
    if (this.storage) {
      this.storage.setItem(key, value);
      return true;
    }
    return false;
  }

  getData(key: string): any {
    if (this.storage) {
      return JSON.parse(this.storage.getItem(key) || '{}');
    } 
    return null;
  }
}
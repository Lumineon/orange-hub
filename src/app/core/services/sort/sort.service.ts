import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortService {
  constructor() { }

  sortDataPerName( data: any, isAsc: boolean ) {
    if ( isAsc ){
      return data.sort((a: { name: string; }, b: { name: string; }) => 
      (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));
    }
    else {
      return data.sort((a: { name: string; }, b: { name: string; }) => 
      (a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1));
    }
  }

  sortDataPerStars( data: any, isAsc: boolean ) {
    if ( isAsc ){
      return data.sort((a: { watchers_count: number; }, b: { watchers_count: number; }) => 
      (a.watchers_count - b.watchers_count));
    }
    else {
      return data.sort((a: { watchers_count: number; }, b: { watchers_count: number; }) => 
      (b.watchers_count - a.watchers_count));
    }
  }
}

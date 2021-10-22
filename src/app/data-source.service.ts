import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DATA } from './data';
import { Item } from './model/item';

@Injectable({
  providedIn: 'root',
})
export class DataSourceService {
  private data$$$ = new BehaviorSubject<Item[]>(DATA);
  data$ = this.data$$$.asObservable();

  constructor() {}
}

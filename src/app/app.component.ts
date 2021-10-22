import { DataSourceService } from './data-source.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { map, share, shareReplay, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = new FormControl('');
  price = new FormControl('');

  data$ = combineLatest([
    this.name.valueChanges.pipe(startWith(''), map(name => name.toLowerCase())),
    this.price.valueChanges.pipe(startWith('')),
    this.dataSource.data$,
  ]).pipe(
    map(([name, price, data]) =>
      data.filter((item) =>
        item.name.toLocaleLowerCase().includes(name) &&
        item.price.toLocaleString().includes(price)
      )
    ),
    shareReplay(1)
  );

  count$ = this.data$.pipe(map(data => data.length));

  constructor(private dataSource: DataSourceService) {}
}

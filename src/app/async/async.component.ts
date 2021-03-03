import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, toArray } from 'rxjs/operators';

interface IProductCheckBox {
  option: string;
  selected: boolean;
}

interface IUser {
  name: string;
  login: string;
}

@Component({
  selector: 'app-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.css']
})
export class AsyncComponent implements OnInit {
  options$?: Observable<IProductCheckBox[]>;
  user$?: Observable<IUser>;

  constructor() {
  }

  ngOnInit(): void {
    this.options$ = new Observable<IProductCheckBox>(subscriber => {
      for (let count = 1; count <= 10; count++) {
        const selected = count < 3;
        subscriber.next({option: `This is my ${count} option`, selected});
      }
      subscriber.complete();
    }).pipe(
      toArray(),
      delay(200)
    );

    this.user$ = new Observable(subscriber => {
      const names = ['James', 'John', 'Brian', 'Rudolf'];
      const logins = ['james123', 'j0hn', 'br1an', 'rudolf'];
      let counter = 0;
      setInterval(() => {
        if (counter < names.length) {
          subscriber.next({name: names[counter], login: logins[counter]});
          counter++;
        } else {
          subscriber.complete();
        }
      }, 3000);
    });
    this.user$.subscribe(value => console.log(value));

  }
}

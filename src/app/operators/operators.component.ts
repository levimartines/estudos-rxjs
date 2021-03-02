import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, fromEvent, Subscription } from 'rxjs';
import { delay, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit, OnDestroy {
  subscription$ = new Subscription();

  constructor() {
  }

  ngOnInit(): void {
  }

  map(): void {
    this.subscription$.add(from<number[]>([1, 2, 3, 4, 5, 6, 7])
      .pipe(
        map(project => project * 2),
        map(project => project * 5),
        delay(500)
      )
      .subscribe(next => console.log(next)));

    this.subscription$.add(fromEvent<MouseEvent>(document, 'click')
      .pipe(
        map((e: MouseEvent) => ({x: e.screenX, y: e.screenY}))
      )
      .subscribe(next => console.log(next)));
  }

  filter(): void {
    this.subscription$.add(
      from<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9 , 10])
        .pipe(
          filter(next => next % 2 === 0),
          map(next => next * 100)
        ).subscribe(next => console.log(next))
    );
  }

  unsubscribe(): void {
    this.subscription$.unsubscribe();
    this.subscription$ = new Subscription();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }
}

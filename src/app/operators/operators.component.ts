import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { from, fromEvent, interval, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, delay, filter, first, map, tap } from 'rxjs/operators';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit, OnDestroy {
  @ViewChild(MatRipple, {static: false}) ripple?: MatRipple;
  subscription$ = new Subscription();
  searchEntry$ = new Subject<string>();
  searchInput = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  mapClick(): void {
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

  filterClick(): void {
    this.subscription$.add(
      from<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        .pipe(
          // filter para filtrar (manter) os que retornarem true
          filter(next => next % 2 === 0),
          // map para realizar alteração do valor
          map(next => next * 100)
        ).subscribe(next => console.log(next))
    );
  }

  tapClick(): void {
    this.subscription$.add(interval(1000)
      .pipe(
        // tap para chamar alguma função
        tap(next => console.log('Before filter : ' + next)),
        filter(next => next % 2 === 0),
        delay(1000)
      )
      .subscribe(next => console.warn('Final value: ' + next))
    );
  }

  takeClick(): void {
    const observable = new Observable(subscriber => {
      for (let counter = 1; counter <= 20; counter++) {
        setTimeout(() => subscriber.next(counter), counter * 200);
      }
      setTimeout(() => subscriber.complete(), 20000);
    });

    const subscription = observable
      .pipe(
        tap(next => console.log('Value before take: ' + next)),
        // completa a subscription automaticamente após X elementos
        // take(10)
        first()
        // se des-inscreve automaticamente após o complete() do observable
        // last()
      ).subscribe(
        next => console.log('Subscription output: ' + next),
        error => console.error(error),
        () => console.log('Completed')
      );

    const interv = setInterval(() => {
      console.log('Checking Subscription');
      if (subscription.closed) {
        console.warn('Subscription CLOSED');
        clearInterval(interv);
      }
    }, 200);
  }

  launchRipple(): void {
    const rippleRef = this.ripple?.launch({
      persistent: true,
      centered: true
    });
    rippleRef?.fadeOut();
  }

  /*  debounceTimeClick(): void {
      fromEvent<MouseEvent>(document, 'click')
        .pipe(debounceTime(1000))
        .subscribe((next: MouseEvent) => {
          console.log('Click with debounceTime', next);
          this.launchRipple();
        });
    }*/

  unsubscribe(): void {
    this.subscription$.unsubscribe();
    this.subscription$ = new Subscription();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  searchBy_usingDebounce($event: KeyboardEvent): void {
    this.searchEntry$.next(this.searchInput);
  }

  debounceTimeSearch(): void {
    this.searchEntry$
      // realiza o evento do subscribe após X tempo sem nenhum evento emitido pelo Observable
      .pipe(debounceTime(700))
      .subscribe(next => console.log(next));
  }
}

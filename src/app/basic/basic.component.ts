import { Component, OnInit } from '@angular/core';
import { from, fromEvent, interval, Observable, Observer, of, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {

  subscription$ = new Subscription();

  constructor() {
  }

  ngOnInit(): void {
  }

  createObservable(): void {
    const observable = new Observable((observer: Observer<string>) => {
      observer.next('Hello');
      observer.next('from');
      observer.next('observable');
      observer.complete();
    });
    observable.subscribe(next => console.log(next));
  }

  from(): void {
    const source = [10, 20, 30, 'batata', {x: 22, nome: 'Jiraya'}];
    const subscription$ = from(source);
    subscription$.subscribe(next => console.log(next));
  }

  of(): void {
    const source = [10, 20, 30, 'batata', {x: 22, nome: 'Jiraya'}];
    const subscription$ = of(source);
    subscription$.subscribe(next => console.log(next));
  }

  interval(): void {
    const inter = interval(1000);
    const sub$ = inter.subscribe(next => console.log(next));
    this.subscription$.add(sub$);
  }

  timer(): void {
    const inter = timer(3000, 1000);
    const sub$ = inter.subscribe(next => console.log(next));
    this.subscription$.add(sub$);
  }

  fromEvent(): void {
    const sub$ = fromEvent(document, 'click').subscribe(next => console.log(next));
    this.subscription$.add(sub$);
  }

  unsubscribe(): void {
    this.subscription$.unsubscribe();
    this.subscription$ = new Subscription();
  }

}

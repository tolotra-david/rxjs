import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription, of, from } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  ngOnInit(): void {

    from([1, 2, 12, 13, 14, 0, 15])
      .pipe(
        tap(elem => console.log(elem)),
        map((elem: number) => {
          if (elem == 0) {
            throw new Error('zero erreur');
          }
          return elem * 2;
        }),
        map(item => item - 2),
        take(2)
      )
      .subscribe(
        (item: number) => console.log(`Ma valeur ${item}`),
        (err: unknown) => console.log(err),
        () => console.log('terminé')
      );

  }

  public start(): void {
    this.subscription.add(interval(1000).subscribe(
      value => console.log('Ma valeur ', value),
      error => console.log(error),
      () => console.log('Terminé')
    ));
    this.subscription.add(interval(1000).subscribe(
      value => console.warn('= Ma valeur =', value),
      error => console.log(error),
      () => console.warn('= Terminé =')
    ));
  }

  public stop(): void {
    this.subscription.unsubscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

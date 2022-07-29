import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private subscription: any;
  ngOnInit(): void {
    const observer = {
      next: (item: unknown) => console.log(`Une boite arrive ${item}`),
      error: (err: unknown) => console.log(`Oups il y a eu une erreur ${err}`),
      complete: () => console.log(`terminé... plus rien`)
    };
    const stream = new Observable(myObserver => {
      myObserver.next('Boite 1');
      myObserver.error(new Error());
      myObserver.next('Boite 2');
      myObserver.complete();
      myObserver.next('Boite 3');
    });

    const subscription = stream.subscribe(
      item => console.log(`Une boite arrive ${item}`),
      err => console.log(`Erreur ${err}`),
      () => console.log(`terminé... plus rien`)
    );

    subscription.unsubscribe();
  }

  public start(): void {
    this.subscription = interval(1000).subscribe(
      value => console.log('Ma valeur ', value),
      error => console.log(error),
      () => console.log('Terminé')
    );
  }

  public stop(): void {
    this.subscription.unsubscribe();
  }
}

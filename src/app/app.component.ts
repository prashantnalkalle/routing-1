import { Component } from '@angular/core';
import { asyncScheduler, BehaviorSubject, observeOn } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  static  loading$ = new BehaviorSubject<boolean>(false);

  title = 'routing-1';
  loading$ = AppComponent.loading$.pipe(observeOn(asyncScheduler));

  static startLoading(): void {
    AppComponent.loading$.next(true);
  }

  static stopLoading(): void {
    AppComponent.loading$.next(false);
  }
}

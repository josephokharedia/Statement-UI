import {Component} from '@angular/core';
import {ObservableMedia} from '@angular/flex-layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ekugcineni';
  $mobileView: Observable<boolean>;

  constructor(media: ObservableMedia) {
    this.$mobileView = media.asObservable().pipe(map(mc => mc.mqAlias === 'xs'));
  }
}

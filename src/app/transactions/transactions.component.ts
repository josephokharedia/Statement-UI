import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ObservableMedia} from '@angular/flex-layout';
import {fromEvent, Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {Transaction} from '../shared/shared.model';
import {ActivatedRoute} from '@angular/router';
import {TransactionService} from './transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, AfterViewInit {

  mobileView$: Observable<Boolean>;
  readonly displayedColumns: string[] = ['date', 'description', 'amount', 'balance'];
  transactions$: Observable<Transaction[]>;
  @ViewChild('filter', {read: ElementRef})
  filter: ElementRef;
  search$: Observable<Transaction[]>;

  constructor(media: ObservableMedia, private route: ActivatedRoute, private transactionService: TransactionService) {
    this.mobileView$ = media.asObservable().pipe(map(mc => mc.mqAlias === 'xs'));
  }

  ngOnInit() {
    this.transactions$ = fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        map(() => this.filter.nativeElement.value),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(search => this.transactionService.getTransactions({search}))
      );
  }

  ngAfterViewInit() {
    this.filter.nativeElement.dispatchEvent(new Event('keyup', {bubbles: false}));
  }


  selectRow() {
  }
}

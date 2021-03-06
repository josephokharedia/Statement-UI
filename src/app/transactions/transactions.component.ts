import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ObservableMedia} from '@angular/flex-layout';
import {fromEvent, Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, tap} from 'rxjs/operators';
import {TransactionsDatasource} from './transactions-datasource';
import {TransactionService} from './transaction.service';
import {MatPaginator, MatSort} from '@angular/material';
import {Category} from '../shared/shared.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, AfterViewInit {

  _fromDate: Date;
  _toDate: Date = new Date();
  _categoryIds: string[] = [];

  mobileView$: Observable<Boolean>;
  readonly displayedColumns: string[] = ['date', 'description', 'amount', 'balance'];
  @ViewChild('filter', {read: ElementRef})
  filter: ElementRef;
  dataSource: TransactionsDatasource;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  readonly categories: Category[] = [
    {_id: '0', name: 'Groceries'},
    {_id: '1', name: 'Entertainment'},
    {_id: '2', name: 'Salaries'},
    {_id: '3', name: 'Automobile'},
    {_id: '4', name: 'Medical'},
  ];

  constructor(private media: ObservableMedia, private service: TransactionService) {
  }

  ngOnInit() {
    this.mobileView$ = this.media.asObservable().pipe(map(mc => mc.mqAlias === 'xs'));
    this.dataSource = new TransactionsDatasource(this.service);
  }

  selectRow() {
  }

  ngAfterViewInit(): void {
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.getTransactions();
        })
      ).subscribe();


    this.paginator.page
      .pipe(tap(() => this.getTransactions()))
      .subscribe();

    this.sort.sortChange
      .pipe(tap(() => {
        this.paginator.pageIndex = 0;
        this.getTransactions();
      })).subscribe();

    this.getTransactions();
  }

  setFromDate(date: Date) {
    this._fromDate = date;
    this.paginator.pageIndex = 0;
    this.getTransactions();
  }

  setToDate(date: Date) {
    this._toDate = date;
    this.paginator.pageIndex = 0;
    this.getTransactions();
  }

  setCategoryIds(categoryIds: string[]) {
    this._categoryIds = categoryIds;
    this.paginator.pageIndex = 0;
    this.getTransactions();
  }

  getTransactions() {
    const sortField = `${this.sort.active}`;
    const sortDirection = `${this.sort.direction}`;

    this.dataSource.getTransactions(
      this.filter.nativeElement.value, this._categoryIds, this._fromDate, this._toDate,
      sortField, sortDirection, this.paginator.pageIndex, this.paginator.pageSize);
  }
}

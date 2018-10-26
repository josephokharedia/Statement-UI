import {DataSource} from '@angular/cdk/table';
import {Transaction} from '../shared/shared.model';
import {CollectionViewer} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {TransactionService} from './transaction.service';
import {catchError, finalize} from 'rxjs/operators';

export class TransactionsDatasource extends DataSource<Transaction> {

  private transactionSubject = new BehaviorSubject<Transaction[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private service: TransactionService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Transaction[]> {
    return this.transactionSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.transactionSubject.complete();
    this.loadingSubject.complete();
  }

  getTransactions(search, categoryIds, fromDate: Date, toDate: Date,
                  sortField: string, sortDirection: string, pageIndex = 0, pageSize = 10) {
    // this.loadingSubject.next(true);
    return this.service.retrieve(search, categoryIds, fromDate, toDate,
      sortField, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)))
      .subscribe((transactions) => this.transactionSubject.next(transactions));
  }

}

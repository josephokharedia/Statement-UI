import {Injectable} from '@angular/core';
import {Transaction} from '../shared/shared.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  transactions: Transaction[] = [];

  constructor(private http: HttpClient) {
    const tx1 = {_id: '1', accountNumber: '000000', description: 'Transaction 1', amount: 50.45, balance: 300.00, hash: '1'};
    const tx2 = {_id: '2', accountNumber: '000000', description: 'Transaction 2', amount: 45.23, balance: 420.00, hash: '2'};
    this.transactions.push(tx1);
    this.transactions.push(tx2);
  }

  getTransactions(params = {}): Observable<Transaction[]> {
    // return of(this.transactions);
    return this.http.get<Transaction[]>('/api/transactions', {params});
  }
}

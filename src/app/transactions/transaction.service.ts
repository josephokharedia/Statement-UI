import {Injectable} from '@angular/core';
import {Transaction} from '../shared/shared.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) {
  }

  retrieve(search: string, categoryIds: string[] = [], fromDate: Date, toDate: Date, sortField: string, sortDirection: string,
           pageIndex = 0, pageSize = 10): Observable<Transaction[]> {
    let httpParams = new HttpParams()
      .set('search', search)
      .set('fromDate', `${fromDate}`)
      .set('toDate', `${toDate}`)
      .set('sortField', sortField)
      .set('sortDirection', sortDirection)
      .set('pageIndex', `${pageIndex}`)
      .set('pageSize', `${pageSize}`);

    categoryIds.forEach(val => httpParams = httpParams.append('category', val));
    return this.http.get<Transaction[]>('/api/transactions', {
      params: httpParams
    });
  }
}

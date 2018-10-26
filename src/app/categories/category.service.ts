import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from '../shared/shared.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter, mergeAll, mergeMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categorySubject = new BehaviorSubject([]);
  private categories$ = this.categorySubject.asObservable();

  constructor(private http: HttpClient) {
    this.retrieve();
  }

  create(category: Category): Observable<any> {
    return this.http.post(`/api/category`, category)
      .pipe(mergeMap(() => this._refresh()));
  }

  retrieve(): Observable<Category[]> {
    this._refresh().subscribe();
    return this.categories$;
  }

  update(category: Category): Observable<Category> {
    return this.http.patch(`/api/category`, category)
      .pipe(mergeMap(() => this._refresh()), mergeAll(), filter(c => c._id === category._id));
  }

  delete(categoryId: string): Observable<Category[]> {
    return this.http.delete(`/api/category/${categoryId}`)
      .pipe(mergeMap(() => this._refresh()));
  }

  private _refresh(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/categories')
      .pipe(tap(v => this.categorySubject.next(v)));
  }

}

import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {CategoryService} from '../categories/category.service';
import {Observable, Subscription} from 'rxjs';
import {Category} from '../shared/shared.model';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnDestroy {

  @Output()
  fromDate = new EventEmitter<Date>();

  @Output()
  toDate = new EventEmitter<Date>();

  @Output()
  categoryIds = new EventEmitter<String>();

  categories$: Observable<Category[]>;

  filterForm: FormGroup;
  private fromDateSubscription: Subscription;
  private toDateSubscription: Subscription;
  private categorySubscription: Subscription;

  constructor(private categoryService: CategoryService, private formBuilder: FormBuilder) {
    this.categories$ = this.categoryService.retrieve();
  }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      fromDate: '',
      toDate: new Date(),
      categoryIds: [],
    });

    const fromDatePicker = this.filterForm.get('fromDate');
    const toDatePicker = this.filterForm.get('toDate');
    const categorySelectList = this.filterForm.get('categoryIds');

    fromDatePicker.disable({onlySelf: true});
    toDatePicker.disable({onlySelf: true});

    this.fromDateSubscription = fromDatePicker.valueChanges
      .subscribe(value => this.fromDate.emit(value));

    this.toDateSubscription = toDatePicker.valueChanges
      .subscribe(value => this.toDate.emit(value));

    this.categorySubscription = categorySelectList.valueChanges
      .subscribe(values => {
        this.categoryIds.emit(values);
      });
  }

  ngOnDestroy() {
    this.fromDateSubscription.unsubscribe();
    this.toDateSubscription.unsubscribe();
    this.categorySubscription.unsubscribe();
  }
}

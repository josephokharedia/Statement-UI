import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MAT_DIALOG_DATA, MatChipInputEvent, MatDialogRef} from '@angular/material';
import {Category} from '../shared/shared.model';
import {BehaviorSubject, Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category-dialog.component.html',
  styleUrls: ['./manage-category-dialog.component.css']
})
export class ManageCategoryDialogComponent implements OnInit, OnDestroy {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  action = Action.ADD;
  category: Category;
  ActionType = Action;
  categoryForm: FormGroup;

  private categoryTagsSubscription: Subscription;
  private categoryNameSubscription: Subscription;
  private allowSubmitSubject = new BehaviorSubject(false);
  allowSubmit$ = this.allowSubmitSubject.asObservable();

  constructor(private dialogRef: MatDialogRef<ManageCategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: DialogData, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.category = this.data.category;
    this.action = Action[this.data.action] || Action.ADD;

    if (this.action === Action.ADD) {
      this.category = {name: '', tags: []};
    }

    this.categoryForm = this.formBuilder.group({
      name: this.category.name,
      tags: [this.category.tags]
    });

    this.categoryNameSubscription = this.categoryForm.get('name').valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
      )
      .subscribe(value => {
        this.category.name = value;
        this.allowSubmitSubject.next(this.category.name && !!this.category.tags.length);
      });

    this.categoryTagsSubscription = this.categoryForm.get('tags').valueChanges
      .subscribe(value => {
        this.allowSubmitSubject.next(this.category.name && !!this.category.tags.length);
      });

    this.allowSubmitSubject.next(this.category.name && !!this.category.tags.length);
  }


  submit(category: Category) {
    this.dialogRef.close(category);
  }

  removeTagFromCategory(tag) {
    const index = this.category.tags.indexOf(tag);
    if (index >= 0) {
      this.category.tags.splice(index, 1);
      this.categoryForm.get('tags').setValue(!!this.category.tags.length ? this.category.tags : null);
    }
  }

  addTagToCategory(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.category.tags.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
    this.categoryForm.get('tags').setValue(this.category.tags);
  }

  cancel() {
    this.dialogRef.close();
  }


  ngOnDestroy(): void {
    this.allowSubmitSubject.unsubscribe();
    this.categoryNameSubscription.unsubscribe();
    this.categoryTagsSubscription.unsubscribe();
  }
}

interface DialogData {
  action: string;
  category: Category;
}


enum Action {
  ADD = 'ADD',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}

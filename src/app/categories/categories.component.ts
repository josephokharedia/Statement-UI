import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ManageCategoryDialogComponent} from './manage-category-dialog.component';
import {CategoryService} from './category.service';
import {Observable} from 'rxjs';
import {Category} from '../shared/shared.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories$: Observable<Category[]>;

  constructor(private dialog: MatDialog, private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.categories$ = this.categoryService.retrieve();
  }

  addCategoryDialog() {
    const dialogRef = this.dialog.open(ManageCategoryDialogComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(val => {
      console.log('create category', val);
      this.categoryService.create(val).subscribe();
    });
  }

  editCategoryDialog(category: Category) {
    const _category = Object.assign({}, category);
    _category.tags = category.tags.slice(0);
    console.log('category:', category);
    const dialogRef = this.dialog.open(ManageCategoryDialogComponent, {
        data: {category: _category, action: 'EDIT'}
      })
    ;
    dialogRef.afterClosed().subscribe(val => {
      this.categoryService.update(val).subscribe();
    });
  }

  deleteCategoryDialog(category: Category) {
    const _category = Object.assign({}, category);
    _category.tags = category.tags.slice(0);
    const dialogRef = this.dialog.open(ManageCategoryDialogComponent, {
      data: {category: _category, action: 'DELETE'}
    });
    dialogRef.afterClosed().subscribe(val => {
      this.categoryService.delete(val._id).subscribe();
    });
  }

}

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';
import {FlexLayoutModule, ObservableMediaProvider} from '@angular/flex-layout';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {TransactionsComponent} from './transactions/transactions.component';
import {StatementsComponent} from './statements/statements.component';
import {CategoriesComponent} from './categories/categories.component';
import {ManageCategoryDialogComponent} from './categories/manage-category-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FilterComponent } from './filter/filter.component';


const appRoutes: Routes = [
  {path: 'transactions', component: TransactionsComponent},
  {path: 'statements', component: StatementsComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent,
    StatementsComponent,
    CategoriesComponent,
    ManageCategoryDialogComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, MatToolbarModule, MatSidenavModule, MatButtonModule,
    MatIconModule, MatListModule, MatFormFieldModule, FlexLayoutModule, HttpClientModule, MatTableModule,
    MatTabsModule, MatInputModule, MatProgressSpinnerModule, MatPaginatorModule, MatSortModule,
    MatDatepickerModule, MatNativeDateModule, MatListModule, MatCheckboxModule, MatExpansionModule, MatChipsModule, MatDialogModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false} // <-- debugging purposes only
    )
  ],
  providers: [ObservableMediaProvider],
  bootstrap: [AppComponent],
  entryComponents: [ManageCategoryDialogComponent],
})
export class AppModule {
}

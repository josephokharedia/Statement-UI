import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
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


const appRoutes: Routes = [
  {path: 'transactions', component: TransactionsComponent},
  {path: 'statements', component: StatementsComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent,
    StatementsComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, MatToolbarModule, MatSidenavModule, MatButtonModule,
    MatIconModule, MatListModule, MatFormFieldModule, FlexLayoutModule, HttpClientModule, MatTableModule, MatTabsModule,
    MatInputModule, MatProgressSpinnerModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false} // <-- debugging purposes only
    )
  ],
  providers: [ObservableMediaProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
}

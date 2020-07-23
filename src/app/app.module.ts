import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatBadgeModule,
  MatToolbarModule,
  MatSnackBarModule
} from '@angular/material';
import {ShoeslistComponent} from './shoeslist/shoeslist.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OrdersComponent} from './orders/orders.component';
import {ClientdialogComponent} from './dialogs/clientdialog/clientdialog.component';
import {CreateorderdialogComponent} from './dialogs/createorderdialog/createorderdialog.component';
import {EditorderdialogComponent} from './dialogs/editorderdialog/editorderdialog.component';
import {NeeddeliveryComponent} from './needdelivery/needdelivery.component';
import {ImportordersComponent} from './importorders/importorders.component';
import {NeedtobepayedComponent} from './finance/needtobepayed/needtobepayed.component';
import {FinanceComponent} from './finance/finance.component';
import {CanceledComponent} from './canceled/canceled.component';
import {GetreturnedComponent} from './canceled/getreturned/getreturned.component';
import {CancelorderComponent} from './dialogs/cancelorder/cancelorder.component';
import {EarningsComponent} from './earnings/earnings.component';
import {DatePipe} from '@angular/common';
import {EditshoeComponent} from './dialogs/editshoe/editshoe.component';
import { YesnodialogComponent } from './dialogs/yesnodialog/yesnodialog.component';
import { PatternsComponent } from './dialogs/patterns/patterns.component';
import { CreatepatternComponent } from './dialogs/createpattern/createpattern.component';
import { StatisticComponent } from './statistic/statistic.component';
import {ShoesdialogComponent} from './dialogs/shoesdialog/shoesdialog.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AppordersComponent } from './apporders/apporders.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ApporderdialogComponent } from './dialogs/apporderdialog/apporderdialog.component';


@NgModule({
  declarations: [
    AppComponent,
    ShoeslistComponent,
    OrdersComponent,
    ClientdialogComponent,
    CreateorderdialogComponent,
    EditorderdialogComponent,
    NeeddeliveryComponent,
    ImportordersComponent,
   NeedtobepayedComponent,
    FinanceComponent,
    CanceledComponent,
    GetreturnedComponent,
    CancelorderComponent,
    EarningsComponent,
    EditshoeComponent,
    YesnodialogComponent,
    PatternsComponent,
    CreatepatternComponent,
    StatisticComponent,
    ShoesdialogComponent,
    NotificationsComponent,
    AppordersComponent,
    ApporderdialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatListModule,
    MatSidenavModule,
    MatCardModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatSortModule,
    MatDividerModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    MatToolbarModule,
    DragDropModule,
    MatSnackBarModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [ClientdialogComponent, CreateorderdialogComponent, EditorderdialogComponent, CancelorderComponent,
    EditshoeComponent, YesnodialogComponent, PatternsComponent, CreatepatternComponent, ShoesdialogComponent, ApporderdialogComponent]
})
export class AppModule {
}

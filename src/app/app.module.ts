import {GoogleChartsModule} from 'angular-google-charts';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
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
import {YesnodialogComponent} from './dialogs/yesnodialog/yesnodialog.component';
import {PatternsComponent} from './dialogs/patterns/patterns.component';
import {CreatepatternComponent} from './dialogs/createpattern/createpattern.component';
import {StatisticComponent} from './statistic/statistic.component';
import {ShoesdialogComponent} from './dialogs/shoesdialog/shoesdialog.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {AppordersComponent} from './apporders/apporders.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ApporderdialogComponent} from './dialogs/apporderdialog/apporderdialog.component';
import {ChangeshoepriceComponent} from './changeshoeprice/changeshoeprice.component';
import {NewshoepricedialogComponent} from './dialogs/newshoepricedialog/newshoepricedialog.component';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {CanceledordersComponent} from './canceledorders/canceledorders.component';
import {SetcanceledreasonComponent} from './dialogs/setcanceledreason/setcanceledreason.component';
import {UserstatsComponent} from './userstats/userstats.component';
import {OurttnsComponent} from './ourttns/ourttns.component';
import {NpControlComponent} from './np-control/np-control.component';
import {AdsSpendsComponent} from './ads-spends/ads-spends.component';
import {AddspendsrecComponent} from './dialogs/addspendsrec/addspendsrec.component';
import {PrintingComponent} from './printing/printing.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {AddShoeToOrderComponent} from './dialogs/add-shoe-to-order/add-shoe-to-order.component';
import {UserlogindialogComponent} from './dialogs/userlogindialog/userlogindialog.component';


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
    ChangeshoepriceComponent,
    NewshoepricedialogComponent,
    CanceledordersComponent,
    SetcanceledreasonComponent,
    UserstatsComponent,
    OurttnsComponent,
    NpControlComponent,
    AdsSpendsComponent,
    AddspendsrecComponent,
    PrintingComponent,
    AddShoeToOrderComponent,
    UserlogindialogComponent
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
    MatSnackBarModule,
    NgxMatSelectSearchModule,
    MatSlideToggleModule,
    GoogleChartsModule.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [ClientdialogComponent, CreateorderdialogComponent, CancelorderComponent,
    EditshoeComponent, YesnodialogComponent, PatternsComponent, CreatepatternComponent, ShoesdialogComponent, ApporderdialogComponent,
    NewshoepricedialogComponent, SetcanceledreasonComponent, AddspendsrecComponent, AddShoeToOrderComponent,
    UserlogindialogComponent]
})
export class AppModule {
}

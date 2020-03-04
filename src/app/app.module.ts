import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule, MatButtonModule,
  MatCardModule, MatCheckboxModule, MatDialogModule, MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatPaginatorModule, MatSelectModule,
  MatSidenavModule, MatSortModule, MatTableModule
} from '@angular/material';
import { ShoeslistComponent } from './shoeslist/shoeslist.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { OrdersComponent } from './orders/orders.component';
import { ClientdialogComponent } from './clientdialog/clientdialog.component';
import { CreateorderdialogComponent } from './createorderdialog/createorderdialog.component';
import { EditorderdialogComponent } from './editorderdialog/editorderdialog.component';
import { OurstorageComponent } from './ourstorage/ourstorage.component';
import { CreatestoragerecordComponent } from './createstoragerecord/createstoragerecord.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoeslistComponent,
    OrdersComponent,
    ClientdialogComponent,
    CreateorderdialogComponent,
    EditorderdialogComponent,
    OurstorageComponent,
    CreatestoragerecordComponent
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
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ClientdialogComponent, CreateorderdialogComponent, EditorderdialogComponent, CreatestoragerecordComponent]
})
export class AppModule { }

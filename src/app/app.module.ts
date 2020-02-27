import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule, MatButtonModule,
  MatCardModule, MatDialogModule, MatDividerModule,
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

@NgModule({
  declarations: [
    AppComponent,
    ShoeslistComponent,
    OrdersComponent,
    ClientdialogComponent,
    CreateorderdialogComponent,
    EditorderdialogComponent
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
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ClientdialogComponent, CreateorderdialogComponent, EditorderdialogComponent]
})
export class AppModule { }

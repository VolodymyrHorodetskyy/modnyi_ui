import {Component, OnInit} from '@angular/core';
import {RestService} from '../rest/rest.service';
import {Ordered} from '../entity/Ordered';
import {MatDialog, PageEvent} from '@angular/material';
import {CreateorderdialogComponent} from '../dialogs/createorderdialog/createorderdialog.component';
import {EditorderdialogComponent} from '../dialogs/editorderdialog/editorderdialog.component';
import {GetAllOrderedResponse} from '../entity/response/GetAllOrderedResponse';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Ordered[];
  getAllOrdered: GetAllOrderedResponse;
  displayedColumns: string[] = ['ttn', 'notes', 'nameAndSurname', 'phone', 'address', 'shoe', 'size', 'status'];
  pageEvent: PageEvent;
  ttn: '';
  phone: '';
  withoutTTN: false;
  orderByAr: { orderBy: string, orderByUkr: string }[] = [
    {orderBy: 'dateCreated', orderByUkr: 'Дата створення'},
    {orderBy: 'dateEdited', orderByUkr: 'Дата зміни'}
  ];
  orderByValue: string;

  constructor(private rest: RestService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.updateOnFilters()
  }

  onCreateOrderClick() {
    const dialogRef = this.dialog.open(CreateorderdialogComponent, {
      /*
            disableClose: true
      */
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateOnFilters();
    });
  }

  onRowClick(event, ordered) {
    let dialogRef;
    if (!event.toElement.className.includes('ttn')) {
      dialogRef = this.dialog.open(EditorderdialogComponent, {
        data: ordered
      });
      dialogRef.afterClosed().subscribe(result => {
        this.updateOnFilters();
      });
    }
  }

  updatePage(pageEvent?: PageEvent) {
    this.updateOnFilters();
  }

  updateOrders(page = 0, size = 10, ttn = '', phone = '', withoutTTN = false, orderByValue: string) {
    this.rest.getOrders(page, size, ttn, phone, withoutTTN, orderByValue).subscribe(getAllOrdered => {
      this.orders = getAllOrdered.orderedList;
      this.getAllOrdered = getAllOrdered;
    });
  }

  updateOnFilters() {
    this.updateOrders(this.pageEvent != null ?
      this.pageEvent.pageIndex : 0, this.pageEvent != null ?
      this.pageEvent.pageSize : 10, this.ttn, this.phone, this.withoutTTN, this.orderByValue);
  }


}

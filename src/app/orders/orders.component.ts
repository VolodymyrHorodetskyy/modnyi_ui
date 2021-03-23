import { Component, OnInit } from '@angular/core';
import { Ordered } from '../entity/Ordered';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { CreateorderdialogComponent } from '../dialogs/createorderdialog/createorderdialog.component';
import { EditorderdialogComponent } from '../dialogs/editorderdialog/editorderdialog.component';
import { GetAllOrderedResponse } from '../entity/response/GetAllOrderedResponse';
import { RestorderService } from '../rest/restorder.service';
import { RestuserService } from '../rest/restuser.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Ordered[];
  getAllOrdered: GetAllOrderedResponse;
  displayedColumns: string[] = ['link', 'ttn', 'notes', 'nameAndSurname', 'phone', 'address', 'shoe', 'size', 'status', 'dateCreated'];
  pageEvent: PageEvent;
  ttn: '';
  phoneOrName: '';
  withoutTTN: false;
  orderByAr: { orderBy: string, orderByUkr: string }[] = [
    { orderBy: 'dateCreated', orderByUkr: 'Дата створення' },
    { orderBy: 'dateEdited', orderByUkr: 'Дата зміни' }
  ];
  orderByValue: string;
  users;
  userId;

  constructor(private rest: RestorderService, public dialog: MatDialog, public restUser: RestuserService) {
  }

  ngOnInit() {
    this.updateOnFilters();
    this.restUser.getAllUsers().subscribe(value => {
      this.users = value;
    });
  }

  onCreateOrderClick() {
    const dialogRef = this.dialog.open(CreateorderdialogComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      this.updateOnFilters();
    });
  }

  onRowClick(id) {
    window.open('/order/' + id);
  }

  updatePage(pageEvent?: PageEvent) {
    this.pageEvent = pageEvent;
    this.updateOnFilters();
  }

  updateOrders(page = 0, size = 10, ttn = '', phoneOrName = '', withoutTTN = false, orderByValue: string, userId = '') {
    this.rest.getOrders(page, size, ttn, phoneOrName, withoutTTN, orderByValue, userId).subscribe(getAllOrdered => {
      this.orders = getAllOrdered.orderedList;
      this.getAllOrdered = getAllOrdered;
    });
  }

  updateOnFilters() {
    this.updateOrders(this.pageEvent != null ?
      this.pageEvent.pageIndex : 0, this.pageEvent != null ?
      this.pageEvent.pageSize : 10, this.ttn, this.phoneOrName, this.withoutTTN, this.orderByValue, this.userId);
  }

}

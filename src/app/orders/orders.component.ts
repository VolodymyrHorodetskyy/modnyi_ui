import {Component, OnInit} from '@angular/core';
import {Ordered} from '../entity/Ordered';
import {MatDialog, PageEvent} from '@angular/material';
import {CreateorderdialogComponent} from '../dialogs/createorderdialog/createorderdialog.component';
import {EditorderdialogComponent} from '../dialogs/editorderdialog/editorderdialog.component';
import {GetAllOrderedResponse} from '../entity/response/GetAllOrderedResponse';
import {RestorderService} from '../rest/restorder.service';
import {RestuserService} from '../rest/restuser.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Ordered[];
  getAllOrdered: GetAllOrderedResponse;
  displayedColumns: string[] = ['ttn', 'notes', 'nameAndSurname', 'phone', 'address', 'shoe', 'size', 'status', 'dateCreated'];
  pageEvent: PageEvent;
  ttn: '';
  phoneOrName: '';
  withoutTTN: false;
  orderByAr: { orderBy: string, orderByUkr: string }[] = [
    {orderBy: 'dateCreated', orderByUkr: 'Дата створення'},
    {orderBy: 'dateEdited', orderByUkr: 'Дата зміни'}
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

  onRowClick(event, ordered) {
    let dialogRef;
    if (!event.toElement.className.includes('ttn') && !event.toElement.className.includes('button')
      && !event.toElement.className.includes('phone')) {
      dialogRef = this.dialog.open(EditorderdialogComponent, {
        data: ordered
      });
      dialogRef.afterClosed().subscribe(result => {
        this.updateOnFilters();
      });
    }
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

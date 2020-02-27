import {Component, OnInit} from '@angular/core';
import {RestService} from '../rest/rest.service';
import {Ordered} from '../entity/Ordered';
import {MatDialog, PageEvent} from '@angular/material';
import {CreateorderdialogComponent} from '../createorderdialog/createorderdialog.component';
import {EditorderdialogComponent} from '../editorderdialog/editorderdialog.component';
import {GetAllOrderedResponse} from '../entity/GetAllOrderedResponse';

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
  value: '';

  constructor(private rest: RestService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.updateOrders();
  }

  onCreateOrderClick() {
    const dialogRef = this.dialog.open(CreateorderdialogComponent, {
      /*
            disableClose: true
      */
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateOrders(this.pageEvent.pageIndex, this.pageEvent.pageSize, '');
    });
  }

  onRowClick(event, ordered) {
    if (!event.toElement.className.includes('ttn')) {
      this.dialog.open(EditorderdialogComponent, {
        data: ordered
      });
    }
    /*  const dialogRef = this.dialog.open(ClientdialogComponent, {
        disableClose: true,
        data: ordered
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // this.animal = result;
      });*/
  }

  updatePage(pageEvent?: PageEvent) {
    this.updateOrders(pageEvent.pageIndex, pageEvent.pageSize, '');
  }

  updateOrders(page = 0, size = 10, ttn = '') {
    this.rest.getOrders(page, size, ttn).subscribe(getAllOrdered => {
      this.orders = getAllOrdered.orderedList;
      this.getAllOrdered = getAllOrdered;
    });
  }

  onTTNInput(ttn) {
    this.updateOrders(this.pageEvent != null ? this.pageEvent.pageIndex : 0, this.pageEvent != null ? this.pageEvent.pageSize : 10, ttn);
  }

}

import {Component, OnInit} from '@angular/core';
import {RestService} from '../rest/rest.service';
import {Ordered} from '../entity/Ordered';
import {MatDialog} from '@angular/material';
import {ClientdialogComponent} from '../clientdialog/clientdialog.component';
import {CreateorderdialogComponent} from '../createorderdialog/createorderdialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Ordered[];
  displayedColumns: string[] = ['ttn', 'notes', 'nameAndSurname', 'phone', 'status'];

  constructor(private rest: RestService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.rest.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

  onCreateOrderClick(){
    console.log('here');
    const dialogRef = this.dialog.open(CreateorderdialogComponent, {
      /*
            disableClose: true
      */
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  onClientClick(client) {
    const dialogRef = this.dialog.open(ClientdialogComponent, {
      disableClose: true,
      data: client
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}

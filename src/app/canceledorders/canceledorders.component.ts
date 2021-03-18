import {Component, OnInit} from '@angular/core';
import {RestService} from '../rest/rest.service';
import {SetcanceledreasonComponent} from '../dialogs/setcanceledreason/setcanceledreason.component';
import {RestapporderService} from '../rest/restapporder.service';
import {RestuserService} from '../rest/restuser.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-canceledorders',
  templateUrl: './canceledorders.component.html',
  styleUrls: ['./canceledorders.component.css']
})
export class CanceledordersComponent implements OnInit {

  canceledOrders;
  total;
  ttn;
  phoneOrName;
  manual;
  withoutReason;
  users;
  user;
  myType = 'PieChart';

myData = [
    ['London', 8136000],
    ['New York', 8538000],
    ['Paris', 2244000],
    ['Berlin', 3470000],
    ['Kairo', 19500000]
  ];

  constructor(private restUser: RestuserService, private rest: RestService,
              private matDialog: MatDialog, private appOrdersRest: RestapporderService) {
  }

  ngOnInit() {
    this.getCanceled();
    this.restUser.getAllUsers().subscribe(value => {
      this.users = value;
    });
  }

  getCanceled(page = 0, size = 10, phoneOrName = '', ttn = '', manual = '',
              withoutReason = '', userId = '') {
    this.rest.getCanceledOrders(page, size, phoneOrName, ttn, manual, withoutReason, userId).subscribe(value => {
      // @ts-ignore
      this.canceledOrders = value.canceledOrderReasons;
      // @ts-ignore
      this.total = value.total;
    });
  }

  handlePage(event) {
    this.getCanceled(event.pageIndex, event.pageSize);
  }

  onInputsChange() {
    this.getCanceled(0, 10, this.phoneOrName, this.ttn, this.manual, this.withoutReason, this.user);
  }

  onButtonChangeClick(id) {
    const dialog = this.matDialog.open(SetcanceledreasonComponent, {
      data: id
    });
    dialog.afterClosed().subscribe(value => {
      this.onInputsChange();
      this.appOrdersRest.setAmounts();
    });
  }

  onOperatorChange() {
    this.onInputsChange();
  }

}


import {Component, OnInit} from '@angular/core';
import {RestService} from '../rest/rest.service';
import {MatDialog} from '@angular/material';
import {SetcanceledreasonComponent} from '../dialogs/setcanceledreason/setcanceledreason.component';
import {RestapporderService} from '../rest/restapporder.service';

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

  constructor(private rest: RestService, private matDialog: MatDialog, private appOrdersRest: RestapporderService) {
  }

  ngOnInit() {
    this.getCanceled();
  }

  getCanceled(page = 0, size = 10, phoneOrName = '', ttn = '', manual = '',
              withoutReason = '') {
    this.rest.getCanceledOrders(page, size, phoneOrName, ttn, manual, withoutReason).subscribe(value => {
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
    this.getCanceled(0, 10, this.phoneOrName, this.ttn, this.manual, this.withoutReason);
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

}


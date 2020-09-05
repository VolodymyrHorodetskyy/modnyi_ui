import {Component, OnInit} from '@angular/core';
import {RestService} from '../rest/rest.service';

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

  constructor(private rest: RestService) {
  }

  ngOnInit() {
    this.getCanceled();
  }

  getCanceled(page = 0, size = 10, phoneOrName = '', ttn = '', manual = '') {
    this.rest.getCanceledOrders(page, size, phoneOrName, ttn, manual).subscribe(value => {
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
    this.getCanceled(0, 10, this.phoneOrName, this.ttn, this.manual);
  }

}


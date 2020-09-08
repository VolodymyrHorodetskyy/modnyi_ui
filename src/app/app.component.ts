import {Component, OnInit} from '@angular/core';
import {RestnotifService} from './rest/restnotif.service';
import {RestorderService} from './rest/restorder.service';
import {RestapporderService} from './rest/restapporder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  amount;
  showUpdate = true;

  constructor(public restNotif: RestnotifService, public restOrder: RestorderService, public restAppOrders: RestapporderService) {
  }

  ngOnInit() {
    this.restNotif.getUnreadAmount().subscribe(value => {
      this.amount = value;
    });
    this.restAppOrders.setAmounts();
  }

  update() {
    this.showUpdate = false;
    this.restOrder.updateStatuses().subscribe(value => {
      this.showUpdate = true;
    });
  }


}

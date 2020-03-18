import {Component, OnInit} from '@angular/core';
import {RestService} from '../../rest/rest.service';

@Component({
  selector: 'app-importorders',
  templateUrl: './importorders.component.html',
  styleUrls: ['./importorders.component.css']
})
export class ImportordersComponent implements OnInit {

  ttns: string;
  responses: string[];
  response: string;
  needStatusedUpdate: false;
  loaded = true;

  constructor(public rest: RestService) {
  }

  ngOnInit() {
  }

  onImportClick() {
    this.rest.importTTNS(this.ttns).subscribe(data => {
      this.response = data.result;
    });
  }

  onNeedDeliveryClick() {
    this.loaded = false;
    this.rest.needDelivery(this.needStatusedUpdate).subscribe(data => {
      this.loaded = true;
      this.response = data.result;
    });
  }

  onIssueOrders() {
    this.rest.getIssueOrders().subscribe(data => {
      this.response = data.result;
    });
  }

}


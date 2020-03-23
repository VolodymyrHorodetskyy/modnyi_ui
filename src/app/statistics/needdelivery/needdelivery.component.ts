import { Component, OnInit } from '@angular/core';
import {RestService} from '../../rest/rest.service';

@Component({
  selector: 'app-needdelivery',
  templateUrl: './needdelivery.component.html',
  styleUrls: ['./needdelivery.component.css']
})
export class NeeddeliveryComponent implements OnInit {

  response: string;
  loaded = true;
  needStatusedUpdate: false;

  constructor(public rest: RestService) { }

  ngOnInit() {
  }

  onNeedDeliveryClick() {
    this.loaded = false;
    this.rest.needDelivery(this.needStatusedUpdate).subscribe(data => {
      this.loaded = true;
      this.response = data.result;
    });
  }

}

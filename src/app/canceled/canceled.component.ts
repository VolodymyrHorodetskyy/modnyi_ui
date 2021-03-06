import {Component, OnInit} from '@angular/core';
import {RestService} from '../rest/rest.service';

@Component({
  selector: 'app-canceled',
  templateUrl: './canceled.component.html',
  styleUrls: ['./canceled.component.css']
})
export class CanceledComponent implements OnInit {

  canceled: string;
  loaded = false;
  last20History;

  constructor(public rest: RestService) {
  }

  ngOnInit() {
    this.rest.getLast20History('CARGO_RETURN').subscribe(value => {
      this.last20History = value;
    });
  }

  showCanceledClick() {
    this.loaded = true;
    this.rest.getCanceled(false).subscribe(data => {
      this.loaded = false;
      this.canceled = data.result;
    });
  }

  makeReturnClick() {
    this.loaded = true;
    this.rest.returnOrders(false).subscribe(data => {
      this.loaded = false;
      this.canceled = data.result;
    });
  }

}

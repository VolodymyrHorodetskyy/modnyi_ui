import {Component, OnInit} from '@angular/core';
import {RestService} from '../rest/rest.service';
import {DiscountService} from '../rest/discount.service';

@Component({
  selector: 'app-importorders',
  templateUrl: './importorders.component.html',
  styleUrls: ['./importorders.component.css']
})
export class ImportordersComponent implements OnInit {

  ttns: string;
  responses: string[];
  response: string;
  loaded = false;

  importButtonDisable = false;
  discounts;
  discountMain;

  constructor(public rest: RestService, private discountRest: DiscountService) {
  }

  ngOnInit() {
    this.discountRest.getAll().subscribe(value => {
      this.discounts = value;
      for (const disc of this.discounts) {
        if (disc.main) {
          this.discountMain = disc.id;
        }
      }
    });
  }

  onImportClick() {
    this.loaded = true;
    this.importButtonDisable = true;
    this.rest.importTTNS(this.ttns, this.discountMain).subscribe(data => {
      this.importButtonDisable = false;
      this.loaded = false;
      this.response = data.result;
    }, error => {
      this.loaded = false;
      this.response = error;
    });
  }

  onIssueOrders() {
    this.loaded = true;
    this.rest.getIssueOrders().subscribe(data => {
      this.response = data.result;
      this.loaded = false;
    });
  }

  onDiscountChange(discount) {
    this.discountMain = discount;
  }

}


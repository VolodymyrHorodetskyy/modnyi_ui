import {Component, OnInit} from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import {AddspendsrecComponent} from "../dialogs/addspendsrec/addspendsrec.component";
import {AdsSpendsService} from "../rest/ads-spends.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-ads-spends',
  templateUrl: './ads-spends.component.html',
  styleUrls: ['./ads-spends.component.css']
})
export class AdsSpendsComponent implements OnInit {

  response;
  dateTo;
  dateFrom;

  constructor(public dialog: MatDialog, private restAdsSpends: AdsSpendsService, private datePipe: DatePipe) {
  }

  ngOnInit() {
  }

  onAddAdsSpends() {
    this.dialog.open(AddspendsrecComponent);
  }

  show() {
    this.restAdsSpends.getFinanceStatsStringResponse(this.tranformDate(this.dateFrom), this.tranformDate(this.dateTo))
      .subscribe(value => {
        // @ts-ignore
        this.response = value.result;
      });
  }

  private tranformDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm');
  }

}

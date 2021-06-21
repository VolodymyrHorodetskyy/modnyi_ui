import {Component, OnInit} from '@angular/core';
import {RestNpControlService} from '../rest/rest-np-control.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-np-control',
  templateUrl: './np-control.component.html',
  styleUrls: ['./np-control.component.css']
})
export class NpControlComponent implements OnInit {

  cards;
  cardSelected;
  responseCardSum;
  responseNpAccountSum;
  dateFrom;
  dateTo;
  npAccounts;
  npAccountSelected;

  npAccountSelected2;
  dateFrom2;
  dateTo2;


  constructor(private restNpControl: RestNpControlService, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.restNpControl.getCards().subscribe(value => {
      this.cards = value;
      this.restNpControl.getActualCard().subscribe(value1 => {
        // @ts-ignore
        this.cardSelected = value1.id;
        this.onGetCardSum();
      });
    });
    this.restNpControl.getNpAccounts().subscribe(value => {
      this.npAccounts = value;
      this.restNpControl.getSaveParamsForNpAccount().subscribe(value2 => {
        // @ts-ignore
        this.npAccountSelected = value2.npAccountId;
        // @ts-ignore
        this.dateFrom = new Date(value2.from);
        // @ts-ignore
        this.dateTo = new Date(value2.to);
        this.onGetNpAccountSum();
      });
    });
  }

  onGetCardSum() {
    this.restNpControl.getCardSum(this.cardSelected, this.npAccountSelected2,
      this.tranformDate(this.dateFrom2), this.tranformDate(this.dateTo2))
      .subscribe(value => {
        // @ts-ignore
        this.responseCardSum = value.result;
      });
  }

  onGetNpAccountSum() {
    if (this.npAccountSelected != null) {
      this.restNpControl.getRedeliveryStatsByNpAccount(
        this.tranformDate(this.dateFrom), this.tranformDate(this.dateTo), this.npAccountSelected)
        .subscribe(value => {
          // @ts-ignore
          this.responseNpAccountSum = value.result;
        });
    } else {

    }
  }

  private tranformDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm');
  }

}

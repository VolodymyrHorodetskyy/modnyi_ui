import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ReststatisticService} from '../rest/reststatistic.service';
import {DatePipe} from '@angular/common';
import {RestService} from '../rest/rest.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  soldShoeForm = new FormGroup({
    dateFrom: new FormControl(''),
    dateTo: new FormControl(''),
    status: new FormControl('')
  });
  response;
  loaded = false;
  statuses;


  constructor(private restStatistic: ReststatisticService, private rest: RestService, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.rest.getStatuses().subscribe(value => {
      this.statuses = value;
    });

  }

  onSubmit() {
    this.loaded = true;
    this.restStatistic.getSoldShoes(this.datePipe.transform(this.soldShoeForm.value.dateFrom, 'yyyy-MM-dd HH:mm'),
      this.datePipe.transform(this.soldShoeForm.value.dateTo, 'yyyy-MM-dd HH:mm'), this.soldShoeForm.value.status)
      .subscribe(value => {
        this.loaded = false;
        // @ts-ignore
        this.response = value.result;
      });
  }

}

import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ReststatisticService} from '../rest/reststatistic.service';
import {DatePipe} from '@angular/common';
import {RestService} from '../rest/rest.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {


  displayedColumns: string[] = ['shoe', 'receivedamount', 'deniedamount', 'receivedpercentage', 'generalamount'];
  dataSource;

  date = new Date();
  soldShoeForm = new FormGroup({
    dateFrom: new FormControl(new Date(this.date.getFullYear(), this.date.getMonth(), 1)),
    dateTo: new FormControl(this.date),
    status: new FormControl('')
  });
  response;
  loaded = false;
  statuses;
  showResponse = false;
  dataForGoogleChart: any[];
  typeForGoogleChart = 'PieChart';

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private restStatistic: ReststatisticService, private rest: RestService, private datePipe: DatePipe) {

  }

  ngOnInit() {
    this.rest.getStatuses().subscribe(value => {
      this.statuses = value;
    });
    this.getGoogleChart();
    //  this.dataSource.sort = this.sort;

  }

  onSubmit() {
    this.loaded = true;
    /*  this.restStatistic.getSoldShoes(this.tranformDate(this.soldShoeForm.value.dateFrom),
        this.tranformDate(this.soldShoeForm.value.dateTo), this.soldShoeForm.value.status)
        .subscribe(value => {
          this.loaded = false;
          this.showResponse = true;
          // @ts-ignore
          this.response = value.result;
        });*/
    this.getGoogleChart();
    this.getStatShoe();
  }

  getStatShoe() {
    this.restStatistic.getStatShoe(this.tranformDate(this.soldShoeForm.value.dateFrom),
      this.tranformDate(this.soldShoeForm.value.dateTo)).subscribe(value => {
      // @ts-ignore
      this.dataSource = new MatTableDataSource(value);
      this.loaded = false;
    });
  }

  getGoogleChart() {
    this.restStatistic.getShoeOrdersStatsGoogleCharts(this.tranformDate(this.soldShoeForm.value.dateFrom),
      this.tranformDate(this.soldShoeForm.value.dateTo), this.soldShoeForm.value.status).subscribe(value => {
      const arrayOfArray: any[][] = [];
      // @ts-ignore
      for (const stringDouble of value.stringDoubleObjs) {
        const arr = [];
        // @ts-ignore
        arr.push(stringDouble.string);
        // @ts-ignore
        arr.push(stringDouble.aDouble);
        arrayOfArray.push(arr);
      }
      this.dataForGoogleChart = arrayOfArray;
    });
  }

  private tranformDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm');
  }

  sortData(event) {
    console.log(event);
  }

}

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


    displayedColumns: string[] = ['shoe', 'receivedamount', 'deniedamount', 'receivedpercentage', 'generalamount'];
    dataSource;

    soldShoeForm = new FormGroup({
        dateFrom: new FormControl(new Date()),
        dateTo: new FormControl(new Date()),
        status: new FormControl('')
    });
    response;
    loaded = false;
    statuses;
    showResponse = false;


    constructor(private restStatistic: ReststatisticService, private rest: RestService, private datePipe: DatePipe) {

    }

    ngOnInit() {
        this.rest.getStatuses().subscribe(value => {
            this.statuses = value;
        });
    }

    onSubmit() {
        this.loaded = true;
        this.restStatistic.getSoldShoes(this.tranformDate(this.soldShoeForm.value.dateFrom),
            this.tranformDate(this.soldShoeForm.value.dateTo), this.soldShoeForm.value.status)
            .subscribe(value => {
                this.loaded = false;
                this.showResponse = true;
                // @ts-ignore
                this.response = value.result;
            });

        this.restStatistic.getStatShoe(this.tranformDate(this.soldShoeForm.value.dateFrom),
            this.tranformDate(this.soldShoeForm.value.dateTo)).subscribe(value => {
                this.dataSource = value;
            });
    }

    private tranformDate(date) {
        return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm');
    }

}

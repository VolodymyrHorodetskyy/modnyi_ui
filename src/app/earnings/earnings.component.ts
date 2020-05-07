import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {RestService} from '../rest/rest.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.css']
})
export class EarningsComponent implements OnInit {

  response;
  earningForm = new FormGroup({
    dateFrom: new FormControl(''),
    dateTo: new FormControl('')
  });

  constructor(public rest: RestService, public datePipe: DatePipe) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.rest.getEarnings(this.datePipe.transform(this.earningForm.value.dateFrom, 'yyyy-MM-dd HH:mm'),
      this.datePipe.transform(this.earningForm.value.dateTo, 'yyyy-MM-dd HH:mm'))
      .subscribe(value => {
        // @ts-ignore
        this.response = value.result;
      });
  }

}

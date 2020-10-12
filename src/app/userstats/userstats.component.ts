import {Component, OnInit} from '@angular/core';
import {RestService} from '../rest/rest.service';

@Component({
  selector: 'app-userstats',
  templateUrl: './userstats.component.html',
  styleUrls: ['./userstats.component.css']
})
export class UserstatsComponent implements OnInit {

  response;

  constructor(private rest: RestService) {
  }

  ngOnInit() {

  }

  show() {
    this.rest.getUserStats(2).subscribe(value => {
      // @ts-ignore
      this.response = value.result;
    });
  }

}

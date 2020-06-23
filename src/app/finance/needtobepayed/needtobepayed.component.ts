import {Component, OnInit} from '@angular/core';
import {RestService} from '../../rest/rest.service';
import {RestorderService} from '../../rest/restorder.service';

@Component({
  selector: 'app-needtobepayed',
  templateUrl: './needtobepayed.component.html',
  styleUrls: ['./needtobepayed.component.css']
})
export class NeedtobepayedComponent implements OnInit {

  needStatusUpdate: boolean;
  response: string;

  constructor(private rest: RestService, private orderRest: RestorderService) {
  }

  ngOnInit() {
  }

  showNoPayed() {
    this.rest.getNeedToBePayed(this.needStatusUpdate)
      .subscribe(data => {
        this.response = data.result;
      });
  }

  makeAllPayed() {
    this.orderRest.makeAllPayed().subscribe(value => {
    });
  }

}

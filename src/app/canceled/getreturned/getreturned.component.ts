import {Component, OnInit} from '@angular/core';
import {RestService} from '../../rest/rest.service';

@Component({
  selector: 'app-getreturned',
  templateUrl: './getreturned.component.html',
  styleUrls: ['./getreturned.component.css']
})
export class GetreturnedComponent implements OnInit {

  returned: string;
  loaded = true;
  showClientTTN: boolean = false;
  showOnlyDelivered: boolean = false;

  constructor(public rest: RestService) {
  }

  ngOnInit() {
  }

  showReturnedClick() {
    this.loaded = false;
    this.rest.getReturned(this.showClientTTN, this.showOnlyDelivered).subscribe(data => {
      this.returned = data.result;
      this.loaded = true;
    });
  }

}

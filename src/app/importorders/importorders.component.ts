import {Component, OnInit} from '@angular/core';
import {RestService} from '../rest/rest.service';

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

  constructor(public rest: RestService) {
  }

  ngOnInit() {
  }

  onImportClick() {
    this.loaded = true;
    this.importButtonDisable = true;
    this.rest.importTTNS(this.ttns).subscribe(data => {
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

}


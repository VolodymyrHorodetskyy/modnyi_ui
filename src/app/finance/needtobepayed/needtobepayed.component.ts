import {Component, OnInit} from '@angular/core';
import {RestService} from '../../rest/rest.service';

@Component({
  selector: 'app-needtobepayed',
  templateUrl: './needtobepayed.component.html',
  styleUrls: ['./needtobepayed.component.css']
})
export class NeedtobepayedComponent implements OnInit {

  fileToUpload: File = null;
  needStatusUpdate: boolean;
  response: string;

  constructor(public rest: RestService) {
  }

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  showNoPayed() {
    this.rest.getNeedToBePayed(this.needStatusUpdate, this.fileToUpload)
      .subscribe(data => {
        this.response = data.result;
      });
  }
}

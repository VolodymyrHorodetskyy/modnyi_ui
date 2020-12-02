import {Component, OnInit} from '@angular/core';
import {OurttnsService} from '../rest/ourttns.service';

@Component({
  selector: 'app-ourttns',
  templateUrl: './ourttns.component.html',
  styleUrls: ['./ourttns.component.css']
})
export class OurttnsComponent implements OnInit {

  displayedColumns: string[] = ['ttn', 'senderPhone', 'receiverPhone', 'datePayedKeeping', 'status'];

  ourttns;
  ourttnsContent;
  showDeletedAndReceived = false;
  importButtonDisable = false;
  updateButtonDisable = false;
  ttns;

  constructor(public ourttnsRest: OurttnsService) {
  }

  ngOnInit() {
    this.updateOnFilters();
  }

  updateOnFilters() {
    this.ourttnsRest.getAll(0, 10, this.showDeletedAndReceived).subscribe(value => {
      this.ourttns = value;
      // @ts-ignore
      this.ourttnsContent = value.content;
    });
  }

  onImportClick() {
    this.importButtonDisable = true;
    this.ourttnsRest.importOurTtns(this.ttns).subscribe(value => {
      this.ttns = value.result;
      this.updateOnFilters();
      this.importButtonDisable = false;
    });
  }


  onUpdateClick() {
    this.updateButtonDisable = true;
    this.ourttnsRest.updateOurTtns().subscribe(value => {
      this.updateOnFilters();
      this.updateButtonDisable = false;
    });
  }

  showDate(date) {
    if (date != null) {
      return date.dayOfMonth + '.' + date.monthValue + '.' + date.year;
    }
    return '';
  }

}

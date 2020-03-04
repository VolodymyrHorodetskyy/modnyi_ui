import {Component, OnInit} from '@angular/core';
import {CreateorderdialogComponent} from '../createorderdialog/createorderdialog.component';
import {CreatestoragerecordComponent} from '../createstoragerecord/createstoragerecord.component';
import {RestService} from '../rest/rest.service';
import {MatDialog} from '@angular/material';
import {StorageRecord} from '../entity/StorageRecord';

@Component({
  selector: 'app-ourstorage',
  templateUrl: './ourstorage.component.html',
  styleUrls: ['./ourstorage.component.css']
})
export class OurstorageComponent implements OnInit {

  storageRecords: StorageRecord[];

  constructor(private rest: RestService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.updateStorage();
  }

  onCreateOrderClick() {
    const dialogRef = this.dialog.open(CreatestoragerecordComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      this.updateStorage();
    });
  }

  updateStorage() {
    this.rest.getStorageRecords().subscribe(data => {
      this.storageRecords = data;
    });
  }

}

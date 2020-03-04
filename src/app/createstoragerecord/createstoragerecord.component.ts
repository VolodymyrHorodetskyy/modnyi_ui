import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Shoe} from '../entity/Shoe';
import {RestService} from '../rest/rest.service';
import {MatDialogRef} from '@angular/material';
import {OrdersComponent} from '../orders/orders.component';
import {OurstorageComponent} from '../ourstorage/ourstorage.component';
import {StorageRecord} from '../entity/StorageRecord';

@Component({
  selector: 'app-createstoragerecord',
  templateUrl: './createstoragerecord.component.html',
  styleUrls: ['./createstoragerecord.component.css']
})
export class CreatestoragerecordComponent implements OnInit {

  shoes: Shoe[];


  createStorageForm = new FormGroup({
    shoe: new FormControl('', Validators.required),
    size: new FormControl('', Validators.required),
    ttn: new FormControl('')
  });

  constructor(public rest: RestService, public dialogRef: MatDialogRef<OurstorageComponent>) {
  }

  ngOnInit() {
    this.rest.getItems('').subscribe(data => {
      this.shoes = data;
    });

  }

  onButtonCreate() {
    console.log(this.createStorageForm.value);
    this.rest.createStorageRecord(this.createStorageForm.value).subscribe(data => {
      this.dialogRef.close();
    });
  }

}

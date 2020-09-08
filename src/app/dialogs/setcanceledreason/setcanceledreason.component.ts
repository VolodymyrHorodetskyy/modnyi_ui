import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../rest/rest.service';
import {OrdersComponent} from '../../orders/orders.component';
import {CanceledordersComponent} from '../../canceledorders/canceledorders.component';

@Component({
  selector: 'app-setcanceledreason',
  templateUrl: './setcanceledreason.component.html',
  styleUrls: ['./setcanceledreason.component.css']
})
export class SetcanceledreasonComponent implements OnInit {

  reasons: string[];
  setCanceled = new FormGroup({
    reason: new FormControl('', Validators.required),
    comment: new FormControl(''),
    newTTN: new FormControl(''),
    returnTTN: new FormControl('')
  });

  constructor(public rest: RestService, @Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<CanceledordersComponent>) {
  }

  ngOnInit() {
    this.rest.getReasons().subscribe(data => {
      this.reasons = data;
    });
    this.rest.getCancelOrderReason(this.data).subscribe(data => {
      if (data != null) {
        console.log(data);
        this.setCanceled.patchValue({
          // @ts-ignore
          reason: data.reason,
          // @ts-ignore
          comment: data.comment,
          // @ts-ignore
          newTTN: data.newTtn,
          // @ts-ignore
          returnTTN: data.returnTtn
        });
      }
    });
  }

  onButtonSaveOrder() {
    this.setCanceled.value.id = this.data;
    this.rest.setCanceled(this.setCanceled.value).subscribe(value => {
      this.dialogRef.close();
    });
  }

}

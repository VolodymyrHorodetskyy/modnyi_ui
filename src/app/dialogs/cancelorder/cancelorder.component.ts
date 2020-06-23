import {Component, Inject, OnInit} from '@angular/core';
import {RestService} from '../../rest/rest.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CancelOrderRequest} from '../../entity/CancelOrderRequest';

@Component({
  selector: 'app-cancelorder',
  templateUrl: './cancelorder.component.html',
  styleUrls: ['./cancelorder.component.css']
})
export class CancelorderComponent implements OnInit {

  reasons: string[];
  cancelOrderForm = new FormGroup({
    reason: new FormControl('', Validators.required),
    comment: new FormControl(''),
    newTTN: new FormControl('')
  });

  constructor(public dialogRefCancelOrder: MatDialogRef<CancelorderComponent>,
              public rest: RestService, @Inject(MAT_DIALOG_DATA) public id: number) {
  }

  ngOnInit() {
    this.rest.getReasons().subscribe(data => {
      this.reasons = data;
    });
    this.rest.getCancelOrderReason(this.id).subscribe(data => {
      if (data != null) {
        this.cancelOrderForm.patchValue({
          // @ts-ignore
          reason: data.reason,
          // @ts-ignore
          comment: data.comment
        });
      }
    });

  }

  onButtonCancelOrder() {
    const cancelOrderRequest: CancelOrderRequest = this.cancelOrderForm.value;
    cancelOrderRequest.orderId = this.id;
    this.rest.cancelOrder(cancelOrderRequest).subscribe(data => {
      this.dialogRefCancelOrder.close();
    });
  }

}

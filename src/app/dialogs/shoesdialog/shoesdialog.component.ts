import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {RestService} from '../../rest/rest.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RestorderService} from '../../rest/restorder.service';
import {OrdersComponent} from '../../orders/orders.component';

@Component({
  selector: 'app-shoesdialog',
  templateUrl: './shoesdialog.component.html',
  styleUrls: ['./shoesdialog.component.css']
})
export class ShoesdialogComponent implements OnInit {

  saveShoe = new FormGroup({shoeId: new FormControl('', Validators.required)});
  shoes;

  constructor(@Inject(MAT_DIALOG_DATA) public data, private rest: RestService, private restOrder: RestorderService,
              public dialogRef: MatDialogRef<OrdersComponent>) {
  }

  ngOnInit() {
    this.rest.getItems('').subscribe(data => {
      this.shoes = data;
    });
  }

  onSubmit() {
    this.saveShoe.value.orderId = this.data.id;
    this.restOrder.addShoeToOrder(this.saveShoe.value).subscribe(value => {
      this.dialogRef.close();
    });
  }

}

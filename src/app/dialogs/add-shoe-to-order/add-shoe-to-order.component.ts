import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {RestService} from "../../rest/rest.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Client} from "../../entity/Client";
import {OrdersComponent} from "../../orders/orders.component";
import {EditorderdialogComponent} from "../editorderdialog/editorderdialog.component";

@Component({
  selector: 'app-add-shoe-to-order',
  templateUrl: './add-shoe-to-order.component.html',
  styleUrls: ['./add-shoe-to-order.component.css']
})
export class AddShoeToOrderComponent implements OnInit {

  shoes;
  addShoeToOrderForm = new FormGroup({
    shoeId: new FormControl(''),
    orderId: new FormControl(''),
    size: new FormControl(''),
    comment: new FormControl('')
  });

  constructor(public rest: RestService, @Inject(MAT_DIALOG_DATA) public data
    , public dialogRef: MatDialogRef<EditorderdialogComponent>) {
  }

  ngOnInit(): void {
    this.rest.getItems('').subscribe(data => {
      this.shoes = data;
    });
  }

  onSubmit() {
    this.addShoeToOrderForm.value.orderId = this.data;
    this.rest.addShoeToOrder(this.addShoeToOrderForm.value).subscribe(value => {
      this.dialogRef.close();
    });
  }

  onShoeInput(value) {
    this.rest.getItems(value).subscribe(data => {
      this.shoes = data;
    });
  }

}

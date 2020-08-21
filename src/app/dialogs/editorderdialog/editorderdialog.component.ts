import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {OrdersComponent} from '../../orders/orders.component';
import {Ordered} from '../../entity/Ordered';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Shoe} from '../../entity/Shoe';
import {RestService} from '../../rest/rest.service';
import {EditOrderedRequest} from '../../entity/EditOrderedRequest';
import {StatusDto} from '../../entity/StatusDto';
import {CancelorderComponent} from '../cancelorder/cancelorder.component';
import {RestorderService} from '../../rest/restorder.service';

@Component({
  selector: 'app-editorderdialog',
  templateUrl: './editorderdialog.component.html',
  styleUrls: ['./editorderdialog.component.css']
})
export class EditorderdialogComponent implements OnInit {

  shoes: Shoe[];
  fullPaymentCheckBox = false;
  statuses: StatusDto[];
  shoeModel: Shoe[] = [];

  editForm = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    middleName: new FormControl(''),
    mail: new FormControl(''),
    status: new FormControl('', Validators.required),
    address: new FormControl(''),
    phone: new FormControl('', Validators.required),
    size: new FormControl('', Validators.required),
    shoes: new FormControl('', Validators.required),
    notes: new FormControl(''),
    postComment: new FormControl(''),
    price: new FormControl('', Validators.required),
    prepayment: new FormControl('', Validators.required),
    fullpayment: new FormControl('')
  });

  constructor(public dialogRef: MatDialogRef<OrdersComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Ordered,
              public rest: RestService, private restOrder: RestorderService, public dialog: MatDialog) {
  }


  onShoeChange() {
    const shoes = this.editForm.controls['shoes'].value;
    let price = 0;
    for (const shoe of shoes) {
      price += shoe.price;
    }
    this.editForm.patchValue({
      price: price
    });
  }

  ngOnInit() {
    this.rest.getItems('').subscribe(data => {
      this.shoes = data;
      const selectedShoe = [];
      for (const shoe of this.shoes) {
        for (const oShoe of this.data.orderedShoes) {
          if (shoe.id === oShoe.id) {
            selectedShoe.push(shoe);
          }
        }
      }
      // @ts-ignore
      this.editForm.controls['shoes'].value = selectedShoe;
    });
    this.rest.getStatuses().subscribe(data => {
      this.statuses = data;
    });
    const data = this.data;
    console.log(data);
    this.editForm.patchValue({
      address: data.address,
      postComment: data.postComment,
      phone: data.client != null ? data.client.phone : '',
      // @ts-ignore
      mail: data.client.mail,
      status: data.status,
      name: data.client != null ? data.client.name : '',
      lastName: data.client != null ? data.client.lastName : '',
      middleName: data.client != null ? data.client.middleName : '',
      size: data.size,
      shoes: data.orderedShoes,
      notes: data.notes,
      price: data.price,
      prepayment: data.prePayment,
    });
    if (data.fullPayment) {
      this.fullPaymentCheckBox = data.fullPayment;
      this.editForm.controls['prepayment'].disable();
    }
    console.log(this.editForm.controls['shoes'].value);
  }

  onDenyClick(): void {
    this.dialogRef.close();
  }

  onCancelOrderClick() {
    const dialogRef = this.dialog.open(CancelorderComponent, {
      data: this.data.id.toString()
    });
    dialogRef.afterClosed().subscribe(result => {
        this.dialogRef.close();
      }
    );
  }

  onButtonUpdate() {
    const request: EditOrderedRequest = this.editForm.value;
    request.full_payment = this.fullPaymentCheckBox;
    const shoes = this.editForm.controls['shoes'].value;
    const shoesIds = [];
    for (const shoe of shoes) {
      shoesIds.push(shoe.id);
    }
    this.editForm.value.shoes = shoesIds;
    this.restOrder.updateOrder(this.data.id, request).subscribe(value => {
      this.dialogRef.close();
    });
  }

  onFullPaymentCheckboxClick(event) {
    if (!event) {
      this.editForm.controls['prepayment'].disable();
    } else {
      this.editForm.controls['prepayment'].enable();
    }
  }

  onSearchShoes(event) {
    console.log(event);
  }

}

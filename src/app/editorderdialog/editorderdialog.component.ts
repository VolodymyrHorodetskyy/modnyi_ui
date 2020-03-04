import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {OrdersComponent} from '../orders/orders.component';
import {Client} from '../entity/Client';
import {Ordered} from '../entity/Ordered';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Shoe} from '../entity/Shoe';
import {RestService} from '../rest/rest.service';
import {EditOrderedRequest} from '../entity/EditOrderedRequest';
import {StatusDto} from '../entity/StatusDto';

@Component({
  selector: 'app-editorderdialog',
  templateUrl: './editorderdialog.component.html',
  styleUrls: ['./editorderdialog.component.css']
})
export class EditorderdialogComponent implements OnInit {

  shoes: Shoe[];
  fullPaymentCheckBox = false;
  statuses: StatusDto[];


  editForm = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    middleName: new FormControl(''),
    status: new FormControl('', Validators.required),
    address: new FormControl(''),
    phone: new FormControl('', Validators.required),
    size: new FormControl('', Validators.required),
    shoe: new FormControl('', Validators.required),
    notes: new FormControl(''),
    postComment: new FormControl(''),
    price: new FormControl('', Validators.required),
    prepayment: new FormControl('', Validators.required),
    fullpayment: new FormControl('')
  });

  constructor(public dialogRef: MatDialogRef<OrdersComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Ordered,
              public rest: RestService) {
    console.log(data);
    this.editForm.patchValue({
      address: data.address,
      postComment: data.postComment,
      phone: data.client != null ? data.client.phone : '',
      status: data.status,
      name: data.client != null ? data.client.name : '',
      lastName: data.client != null ? data.client.lastName : '',
      middleName: data.client != null ? data.client.middleName : '',
      size: data.size,
      shoe: data.orderedShoes != null && data.orderedShoes.length > 0 ? data.orderedShoes[0].id : '',
      notes: data.notes,
      price: data.price,
      prepayment: data.prePayment,
    });
    if (data.fullPayment) {
      this.fullPaymentCheckBox = data.fullPayment;
      this.editForm.controls['prepayment'].disable();
    }
  }



  onShoeChange(value) {
    console.log(this.editForm.get('price').value);
    const shoe = this.shoes.find(shoe => shoe.id === value);
    this.editForm.patchValue({
      price: shoe.price
    });
  }

  ngOnInit() {
    this.rest.getItems('').subscribe(data => {
      this.shoes = data;
    });
    this.rest.getStatuses().subscribe(data => {
      this.statuses = data;
    });
  }

  onDenyClick(): void {
    this.dialogRef.close();
  }

  onButtonUpdate() {
    const request: EditOrderedRequest = this.editForm.value;
    request.full_payment = this.fullPaymentCheckBox;
    console.log(request.full_payment);
    this.rest.updateOrder(this.data.id, request).subscribe(value => {
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

}

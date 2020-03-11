import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../rest/rest.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {OrdersComponent} from '../orders/orders.component';
import {HttpErrorResponse} from '@angular/common/http';
import {Shoe} from '../entity/Shoe';
import {StatusDto} from '../entity/StatusDto';

@Component({
  selector: 'app-createorderdialog',
  templateUrl: './createorderdialog.component.html',
  styleUrls: ['./createorderdialog.component.css']
})
export class CreateorderdialogComponent implements OnInit {

  errorValue: string;
  shoes: Shoe[];
  postComment: string;
  fullPaymentCheckBox = false;
  statuses: StatusDto[];
  fromStorage;

  createForm = new FormGroup({
    ttn: new FormControl(''),
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
    fullpayment: new FormControl(''),
    fromStorage: new FormControl('')
  });

  constructor(public rest: RestService, public dialogRef: MatDialogRef<OrdersComponent>, public formBuilder: FormBuilder) {
  }

  onDenyClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.rest.getItems('').subscribe(data => {
      this.shoes = data;
    });
    this.rest.getStatuses().subscribe(data => {
      this.statuses = data;
    });
  }

  onNP() {
    this.rest.getOrderedNP(null, this.createForm.controls['ttn'].value).subscribe(data => {
      this.createForm.patchValue({
        ttn: data.ttn,
        address: data.address,
        phone: data.client != null ? data.client.phone : '',
        status: data.status,
        name: data.client != null ? data.client.name : '',
        lastName: data.client != null ? data.client.lastName : '',
        middleName: data.client != null ? data.client.middleName : '',
        size: data.size,
        shoe: data.orderedShoes != null && data.orderedShoes.length > 0 ? data.orderedShoes[0].id : '',
        price: data.price,
        prepayment: data.prePayment
      });
      this.postComment = data.postComment;
    }, error1 => {
      this.handleError(error1);
    });
  }

  onShoeChange(value) {
    const shoe = this.shoes.find(shoe => shoe.id === value);
    this.createForm.patchValue({
      price: shoe.price
    });
  }

  private handleError(error: HttpErrorResponse) {
    this.errorValue = error.error.message;
  }

  onButtonSave() {
    this.rest.saveOrder(this.createForm.value).subscribe(data => {
      this.dialogRef.close();
    }, error => {
      this.errorValue = error.error.message;
    });
  }

  onFullPaymentCheckboxClick(event) {
    if (!event) {
      this.createForm.controls['prepayment'].disable();
    } else {
      this.createForm.controls['prepayment'].enable();
    }
    console.log(event);
  }

  onShoeAndSizeChange() {
    const shoeId = this.createForm.controls['shoe'].value;
    const size = this.createForm.controls['size'].value;
    if (!this.isEmpty(shoeId) && !this.isEmpty(size)) {
      this.rest.checkShoeIsPresentInStorage(shoeId, size).subscribe(data => {
        if (data) {
          this.createForm.controls['fromStorage'].enable();
          this.errorValue = 'Доступні на складі';
        } else {
          this.createForm.controls['fromStorage'].disable();
          this.errorValue = '';
        }
      });
    } else {
      this.createForm.controls['fromStorage'].disable();
      this.errorValue = '';
    }
  }

  isEmpty(str) {
    return (!str || 0 === str.length);
  }
}

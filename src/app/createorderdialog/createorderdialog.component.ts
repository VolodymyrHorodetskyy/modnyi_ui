import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../rest/rest.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {OrdersComponent} from '../orders/orders.component';
import {HttpErrorResponse} from '@angular/common/http';
import {Shoe} from '../entity/Shoe';

@Component({
  selector: 'app-createorderdialog',
  templateUrl: './createorderdialog.component.html',
  styleUrls: ['./createorderdialog.component.css']
})
export class CreateorderdialogComponent implements OnInit {

  errorValue: string;
  shoes: Shoe[];

  createForm = new FormGroup({
    ttn: new FormControl('', [Validators.required]),
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    middleName: new FormControl(''),
    status: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl('', Validators.required),
    size: new FormControl('', Validators.required),
    shoe: new FormControl('', Validators.required),
    notes: new FormControl(''),
    postComment: new FormControl(''),
    price: new FormControl('', Validators.required),
    prepayment: new FormControl('', Validators.required)
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
  }

  onNP() {
    this.rest.getOrderedNP(null, this.createForm.controls['ttn'].value).subscribe(data => {
      this.createForm.patchValue({
        ttn: data.ttn,
        address: data.address,
        postComment: data.postComment,
        phone: data.client != null ? data.client.phone : '',
        status: data.status,
        name: data.client != null ? data.client.name : '',
        lastName: data.client != null ? data.client.lastName : '',
        middlename: data.client != null ? data.client.middleName : '',
        size: data.size,
        shoe: data.orderedShoes != null ? data.orderedShoes[0].id : ''
      });
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
    });
  }

}

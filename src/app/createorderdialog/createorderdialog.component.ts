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
    phone: new FormControl(''),
    size: new FormControl(''),
    shoe: new FormControl(''),
    comment: new FormControl(''),
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
        phone: data.client.phone,
        status: data.status,
        name: data.client.name,
        lastName: data.client.lastName,
        middlename: data.client.middleName
      });

      /*this.createForm.controls['address'].setValue(data.address);
      this.createForm.controls['status'].setValue(data.status);
      this.createForm.controls['shoe'].setValue(data.orderedShoes[0].model + ' ' + data.orderedShoes[0].color);
      this.createForm.controls['size'].setValue(data.size);*/
    }, error1 => {
      this.handleError(error1);
    });
  }

  private handleError(error: HttpErrorResponse) {
    this.errorValue = error.error.message;
  }

  test() {
    console.log(this.createForm.getRawValue());
  }

  onButtonSave() {
    this.rest.saveOrder(this.createForm.value).subscribe(data => {
      this.dialogRef.close();
    });
    console.log(this.createForm.value);
  }

}

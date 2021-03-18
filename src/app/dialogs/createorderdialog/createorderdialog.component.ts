import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../rest/rest.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import {OrdersComponent} from '../../orders/orders.component';
import {HttpErrorResponse} from '@angular/common/http';
import {Shoe} from '../../entity/Shoe';
import {StatusDto} from '../../entity/StatusDto';
import {RestorderService} from '../../rest/restorder.service';
import {RestuserService} from '../../rest/restuser.service';

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
  users;

  @ViewChild('singleSelect', {static: true}) singleSelect: MatSelect;


  createForm = new FormGroup({
    ttn: new FormControl(''),
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
    price: new FormControl('', Validators.required),
    prepayment: new FormControl('', Validators.required),
    fullpayment: new FormControl(''),
    fromStorage: new FormControl(''),
    userId: new FormControl('', Validators.required)
  });

  constructor(private restOrder: RestorderService, private rest: RestService,
              public dialogRef: MatDialogRef<OrdersComponent>, private userRest: RestuserService) {
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
    this.userRest.getAllUsers().subscribe(value => {
      this.users = value;
    });
  }

  onNP() {
    this.restOrder.getOrderedNP(null, this.createForm.controls['ttn'].value).subscribe(data => {
      this.createForm.patchValue({
        ttn: data.ttn,
        address: data.address,
        phone: data.client != null ? data.client.phone : '',
        status: data.status,
        name: data.client != null ? data.client.name : '',
        lastName: data.client != null ? data.client.lastName : '',
        middleName: data.client != null ? data.client.middleName : '',
        size: data.size,
        shoes: data.orderedShoes != null && data.orderedShoes.length > 0 ? data.orderedShoes[0].id : '',
        price: data.price,
        prepayment: data.prePayment
      });
      this.postComment = data.postComment;
    }, error1 => {
      this.handleError(error1);
    });
  }

  onShoeChange() {
    const shoes = this.createForm.controls['shoes'].value;
    let price = 0;
    for (const shoe of shoes) {
      price += shoe.price;
    }
    this.createForm.patchValue({
      price: price
    });
  }

  private handleError(error: HttpErrorResponse) {
    this.errorValue = error.error.message;
  }

  onButtonSave() {
    const shoes = this.createForm.controls['shoes'].value;
    const shoesIds = [];
    for (const shoe of shoes) {
      shoesIds.push(shoe.id);
    }
    this.createForm.value.shoes = shoesIds;
    this.restOrder.saveOrder(this.createForm.value).subscribe(data => {
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
  }

  onSearchShoes(text) {
    this.rest.getItems(text).subscribe(value1 => {
      this.shoes = value1;
    });
  }

  triggerEvent(event) {
    if (!event) {
      this.rest.getItems('').subscribe(value1 => {
        this.shoes = value1;
      });
    }
  }

}

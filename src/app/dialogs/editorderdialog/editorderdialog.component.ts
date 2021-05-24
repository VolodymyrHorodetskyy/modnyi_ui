import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Shoe} from '../../entity/Shoe';
import {RestService} from '../../rest/rest.service';
import {EditOrderedRequest} from '../../entity/EditOrderedRequest';
import {StatusDto} from '../../entity/StatusDto';
import {CancelorderComponent} from '../cancelorder/cancelorder.component';
import {RestorderService} from '../../rest/restorder.service';
import {RestuserService} from '../../rest/restuser.service';
import {DiscountService} from '../../rest/discount.service';
import {ActivatedRoute} from '@angular/router';
import {AddShoeToOrderComponent} from "../add-shoe-to-order/add-shoe-to-order.component";
import {YesnodialogComponent} from "../yesnodialog/yesnodialog.component";

@Component({
  selector: 'app-editorderdialog',
  templateUrl: './editorderdialog.component.html',
  styleUrls: ['./editorderdialog.component.css']
})
export class EditorderdialogComponent implements OnInit {

  shoes: Shoe[];
  fullPaymentCheckBox = false;
  statuses: StatusDto[];
  users;
  discounts;
  discountId;
  data;
  idOrder;

  displayedColumns: string[] = ['shoe', 'size', 'comment', 'link'];
  dataSource;

  editForm = new FormGroup({
    name: new FormControl(''),
    lastName: new FormControl(''),
    middleName: new FormControl(''),
    mail: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    notes: new FormControl(''),
    postComment: new FormControl(''),
    price: new FormControl('', Validators.required),
    prepayment: new FormControl('', Validators.required),
    fullpayment: new FormControl(''),
    userId: new FormControl(''),
    urgent: new FormControl(''),
    discountId: new FormControl(''),
    city: new FormControl('')
  });

  constructor(public rest: RestService, private restOrder: RestorderService, public dialog: MatDialog,
              private userRest: RestuserService, private discountRest: DiscountService,
              private route: ActivatedRoute) {
  }


  onShoeOrDiscountChange() {
/*    this.discountRest.getShoePrice(shoesIds, this.discountId).subscribe(value => {
      this.editForm.patchValue({
        price: value
      });
    });*/
  }

  ngOnInit() {
    this.idOrder = this.route.snapshot.paramMap.get('id');
    this.restOrder.getOrderById(this.idOrder).subscribe(value => {
      this.data = value;
      this.rest.getStatuses().subscribe(data => {
        this.statuses = data;
      });
      this.userRest.getAllUsers().subscribe(value => {
        this.users = value;
      });
      this.updateForm(this.data);
      // @ts-ignore
      this.dataSource = value.orderedShoeList;
    });
    this.discountRest.getAll().subscribe(value => {
      this.discounts = value;
    });
  }

  onCancelOrderClick() {
    const dialogRef = this.dialog.open(CancelorderComponent, {
      data: this.data.id.toString()
    });
    dialogRef.afterClosed().subscribe(result => {
      this.updateFormById();
    });
  }

  updateForm(ordered) {
    this.editForm.patchValue({
      address: ordered.address,
      postComment: ordered.postComment,
      phone: ordered.client != null ? ordered.client.phone : '',
      // @ts-ignore
      mail: ordered.client != null ? ordered.client.mail : '',
      status: ordered.status,
      name: ordered.client != null ? ordered.client.name : '',
      lastName: ordered.client != null ? ordered.client.lastName : '',
      middleName: ordered.client != null ? ordered.client.middleName : '',
      notes: ordered.notes,
      price: ordered.price,
      prepayment: ordered.prePayment,
      // @ts-ignore
      userId: ordered.user != null ? ordered.user.id : 1,
      urgent: ordered.urgent,
      city: ordered.city
    });
    this.discountId = ordered.discount != null ? ordered.discount.id : null;
    if (ordered.fullPayment) {
      this.fullPaymentCheckBox = ordered.fullPayment;
      this.editForm.controls['prepayment'].disable();
    }
  }

  private updateFormById() {
    this.restOrder.getOrderById(this.idOrder).subscribe(value => {
      this.data = value;
      // @ts-ignore
      this.dataSource = value.orderedShoeList;
      this.updateForm(this.data);
    });
  }

  onButtonUpdate() {
    const request: EditOrderedRequest = this.editForm.value;
    request.full_payment = this.fullPaymentCheckBox;
    this.restOrder.updateOrder(this.data.id, request).subscribe(value => {
      this.updateFormById();
    });
  }

  onFullPaymentCheckboxClick(event) {
    if (!event) {
      this.editForm.controls['prepayment'].disable();
    } else {
      this.editForm.controls['prepayment'].enable();
    }
  }

  onSearchShoes(text) {
    this.rest.getItems(text).subscribe(value1 => {
      this.shoes = value1;
    });
  }

  addShoeToOrder() {
    const dialog = this.dialog.open(AddShoeToOrderComponent, {data: this.idOrder});
    dialog.afterClosed().subscribe(value => {
      this.updateFormById();
    });
  }

  removeShoeFromOrder(element) {
    const dialog = this.dialog.open(YesnodialogComponent, {
      data: {
        orderId: this.idOrder,
        shoeId: element.id,
        shoeTitle: element.shoe.model + ' ' + element.shoe.color + ' ,розмір: ' + element.size
      }
    });
    dialog.afterClosed().subscribe(value => {
      this.updateFormById();
    });
  }

}

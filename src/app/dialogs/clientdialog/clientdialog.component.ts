import {Component, Inject, OnInit} from '@angular/core';
import {Client} from '../../entity/Client';
import {OrdersComponent} from '../../orders/orders.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-clientdialog',
  templateUrl: './clientdialog.component.html',
  styleUrls: ['./clientdialog.component.css']
})
export class ClientdialogComponent implements OnInit {

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    middleName: new FormControl(''),
    phone: new FormControl(''),
    comment: new FormControl('')
  });

  constructor(
    public dialogRef: MatDialogRef<OrdersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.profileForm.setValue({
      firstName: this.data.name,
      lastName: this.data.lastName,
      middleName: this.data.middleName,
      phone: this.data.phone,
      comment: this.data.comment
    });
  }

  onSubmit() {
    console.log(this.profileForm.getRawValue());
  }


}

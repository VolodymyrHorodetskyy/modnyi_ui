import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RestuserService} from "../../rest/restuser.service";
import {ApporderdialogComponent} from "../apporderdialog/apporderdialog.component";

@Component({
  selector: 'app-userlogindialog',
  templateUrl: './userlogindialog.component.html',
  styleUrls: ['./userlogindialog.component.css']
})
export class UserlogindialogComponent implements OnInit {

  logInForm = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });


  constructor(private userRest: RestuserService,
              public dialogRef: MatDialogRef<ApporderdialogComponent>) {
  }

  ngOnInit(): void {
  }

  logIn() {
    this.userRest.logIn(this.logInForm.value).subscribe(value => {
      // @ts-ignore
      if (value != null && value.user != null) {
        this.dialogRef.close(value);
      } else {
        this.dialogRef.close(null);
      }
    });
  }

}

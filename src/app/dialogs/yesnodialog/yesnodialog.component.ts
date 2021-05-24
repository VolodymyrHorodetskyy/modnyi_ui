import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RestService} from "../../rest/rest.service";

@Component({
  selector: 'app-yesnodialog',
  templateUrl: './yesnodialog.component.html',
  styleUrls: ['./yesnodialog.component.css']
})
export class YesnodialogComponent implements OnInit {

  title = 'Видалити';
  message: string;

  constructor(
    public dialogRef: MatDialogRef<YesnodialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private rest: RestService
  ) {
  }

  ngOnInit() {
    this.message = this.data.shoeTitle;
  }

  onConfirm(): void {
    this.rest.removeShoeFromOrder({
      orderId: this.data.orderId,
      shoeId: this.data.shoeId
    }).subscribe(value => {
      this.dialogRef.close(true);
    });
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}

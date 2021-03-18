import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-yesnodialog',
  templateUrl: './yesnodialog.component.html',
  styleUrls: ['./yesnodialog.component.css']
})
export class YesnodialogComponent implements OnInit {

  dialogData;
  title: string;
  message: string;

  constructor(
    public dialogRef: MatDialogRef<YesnodialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
  }

  ngOnInit() {

  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}

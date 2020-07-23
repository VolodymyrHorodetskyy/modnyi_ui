import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {RestapporderService} from '../../rest/restapporder.service';
import {AppordersComponent} from '../../apporders/apporders.component';

@Component({
  selector: 'app-apporderdialog',
  templateUrl: './apporderdialog.component.html',
  styleUrls: ['./apporderdialog.component.css']
})
export class ApporderdialogComponent implements OnInit {

  statusSelected;
  statuses;
  comment;

  constructor(@Inject(MAT_DIALOG_DATA) public item, private restAppOrder: RestapporderService,
              public dialogRef: MatDialogRef<AppordersComponent>) {
  }

  ngOnInit() {
    this.restAppOrder.getStatuses().subscribe(value => {
      this.statuses = value;
    });
    this.statusSelected = this.item.status;
    this.comment = this.item.comment;
  }


  onSave() {
    this.restAppOrder.changeStatusAndComment({
      id: this.item.id,
      status: this.statusSelected,
      comment: this.comment
    }).subscribe(value => {
      this.dialogRef.close();
    });
  }

}

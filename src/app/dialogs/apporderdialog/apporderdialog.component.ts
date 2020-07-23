import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
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
  ttn;

  constructor(@Inject(MAT_DIALOG_DATA) public item, private restAppOrder: RestapporderService,
              public dialogRef: MatDialogRef<AppordersComponent>, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.restAppOrder.getStatuses().subscribe(value => {
      this.statuses = value;
    });
    this.statusSelected = this.item.status;
    this.comment = this.item.comment;
  }


  onSave() {
    this.restAppOrder.changeAppOrder({
      id: this.item.id,
      status: this.statusSelected,
      comment: this.comment,
      ttn: this.ttn
    }).subscribe(value => {
      this.dialogRef.close();
      // @ts-ignore
      if (value.message != null) {
        this._snackBar.open(value.message, 'ттн додано', {
          duration: 2000,
          verticalPosition: 'top'
        });
      }
    });

  }

}

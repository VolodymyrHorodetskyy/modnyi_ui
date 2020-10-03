import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {RestapporderService} from '../../rest/restapporder.service';
import {AppordersComponent} from '../../apporders/apporders.component';
import {RestuserService} from '../../rest/restuser.service';
import {ReststatisticService} from '../../rest/reststatistic.service';
import {LocalstorageService} from '../../localstorage.service';

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
  users;
  userId;
  response;

  constructor(@Inject(MAT_DIALOG_DATA) public item, private restAppOrder: RestapporderService,
              public dialogRef: MatDialogRef<AppordersComponent>, private _snackBar: MatSnackBar, private userRest: RestuserService,
              public restStat: ReststatisticService, private localStorageService: LocalstorageService) {
  }

  ngOnInit() {
    this.restAppOrder.getStatuses().subscribe(value => {
      this.statuses = value;
    });
    this.userRest.getAllUsers().subscribe(value => {
      this.users = value;
      if (this.item.user != null) {
        this.userId = this.item.user.id;
      } else {
        this.userId = this.localStorageService.getUser();
      }
    });
    this.statusSelected = this.item.status;
    this.comment = this.item.comment;
    this.ttn = this.item.ttn;
    this.restStat.getOrdersAndAppOrdersByPhone(this.item.id).subscribe(value => {
      // @ts-ignore
      this.response = value.result;
    });
  }


  onSave() {
    this.restAppOrder.changeAppOrder({
      id: this.item.id,
      status: this.statusSelected,
      comment: this.comment,
      ttn: this.ttn,
      userId: this.userId
    }).subscribe(value => {
      // @ts-ignore
      if (value.appOrder.status !== 'В_обробці'){
        this.dialogRef.close();
      }
      // @ts-ignore
      if (value.message != null) {
        // @ts-ignore
        this._snackBar.open(value.message, 'ттн додано', {
          duration: 2000,
          verticalPosition: 'top'
        });
      }
    });

  }

}

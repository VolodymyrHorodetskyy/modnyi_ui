import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {RestapporderService} from '../rest/restapporder.service';
import {MatDialog} from '@angular/material/dialog';
import {ApporderdialogComponent} from '../dialogs/apporderdialog/apporderdialog.component';
import {DatePipe} from '@angular/common';
import {RestuserService} from '../rest/restuser.service';


@Component({
  selector: 'app-apporders',
  templateUrl: './apporders.component.html',
  styleUrls: ['./apporders.component.css']
})
export class AppordersComponent implements OnInit {

  id = '';
  phoneOrName = '';
  comment = '';
  dateFromForNotReady;
  dateFromForReady;


  statuses = ['Новий', 'В_обробці', 'Чекаємо_оплату', 'Передплачено', 'Повна_оплата', 'Не_Відповідає', 'Скасовано'];

  new = [];
  inProcess = [];
  waitingForPayment = [];
  prePayed = [];
  fullPayment = [];
  doNotAnswer = [];
  canceled = [];
  users;
  user;

  widthOfCard = '12%';

  constructor(private restAppOrder: RestapporderService, private matDialog: MatDialog, private datePipe: DatePipe,
              private restUser: RestuserService) {
  }

  ngOnInit() {
    let d = new Date();
    d.setDate(d.getDate() - 7);
    this.dateFromForNotReady = d;
    d = new Date();
    d.setDate(d.getDate() - 1);
    this.dateFromForReady = d;
    this.onFilterChange();
    this.restUser.getAllUsers().subscribe(value => {
      this.users = value;
    });
  }

  onFilterChange() {
    this.initAppOrdersArrays(this.id, this.phoneOrName, this.comment, this.tranformDate(this.dateFromForNotReady),
      this.tranformDate(this.dateFromForReady), this.user);
  }

  private tranformDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm');
  }

  initAppOrdersArrays(id = '', phoneAndNumber = '', comment = '', fromForNotReady = '', fromForReady = '', userId = '') {
    this.restAppOrder.getAppOrders(id, phoneAndNumber, comment, fromForNotReady, fromForReady, userId).subscribe(value => {
      // @ts-ignore
      this.new = this.initArray(value.Новий);
      this.restAppOrder.newAppOrders = this.new.length;
      // @ts-ignore
      this.inProcess = this.initArray(value.В_обробці);
      // @ts-ignore
      this.waitingForPayment = this.initArray(value.Чекаємо_оплату);
      // @ts-ignore
      this.prePayed = this.initArray(value.Передплачено);
      // @ts-ignore
      this.fullPayment = this.initArray(value.Повна_оплата);
      // @ts-ignore
      this.doNotAnswer = this.initArray(value.Не_Відповідає);
      // @ts-ignore
      this.canceled = this.initArray(value.Скасовано);
    });
  }

  initArray(array) {
    if (array == null || array.length === 0) {
      return [];
    }
    return array;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  onCardClick(item) {
    const dialog = this.matDialog.open(ApporderdialogComponent, {
      data: item
    });
    dialog.afterClosed().subscribe(value => {
      this.onFilterChange();
    });
  }

  onDropped(event, item) {
    const status = this.statuses[Number(event.container.id.substr(event.container.id.length - 1))];
    item.status = status;
    this.restAppOrder.changeAppOrder({id: item.id, status: status}).subscribe(value => {
      this.initAppOrdersArrays();
    });
  }

  updateAppOrders() {
    this.onFilterChange();
  }

  onOperatorChange() {
    this.onFilterChange();
  }

}

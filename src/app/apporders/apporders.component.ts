import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {RestapporderService} from '../rest/restapporder.service';
import {MatDialog} from '@angular/material';
import {ApporderdialogComponent} from '../dialogs/apporderdialog/apporderdialog.component';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-apporders',
  templateUrl: './apporders.component.html',
  styleUrls: ['./apporders.component.css']
})
export class AppordersComponent implements OnInit {

  id = '';
  phoneOrName = '';
  dateFrom;

  statuses = ['Новий', 'Чекаємо_оплату', 'Передплачено', 'Повна_оплата', 'Не_Відповідає', 'Скасовано'];

  new = [];
  waitingForPayment = [];
  prePayed = [];
  fullPayment = [];
  doNotAnswer = [];
  canceled = [];

  widthOfCard = '400px';

  constructor(private restAppOrder: RestapporderService, private matDialog: MatDialog, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.initAppOrdersArrays();
    var d = new Date();
    d.setDate(d.getDate() - 7);
    this.dateFrom = d;
  }

  onFilterChange() {
    this.initAppOrdersArrays(this.id, this.phoneOrName, this.tranformDate(this.dateFrom));
  }

  private tranformDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm');
  }

  initAppOrdersArrays(id = '', phoneAndNumber = '', from = '') {
    this.restAppOrder.getAppOrders(id, phoneAndNumber, from).subscribe(value => {
      // @ts-ignore
      this.new = this.initArray(value.Новий);
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
      console.log(value);
      this.initAppOrdersArrays();
    });
  }

  onDropped(event, item) {
    const status = this.statuses[Number(event.container.id.substr(event.container.id.length - 1))];
    item.status = status;
    this.restAppOrder.changeStatusAndComment({id: item.id, status: status}).subscribe(
    );
  }

}

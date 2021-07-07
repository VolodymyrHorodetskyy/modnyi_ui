import {Component, OnInit} from '@angular/core';
import {RestnotifService} from './rest/restnotif.service';
import {RestorderService} from './rest/restorder.service';
import {RestapporderService} from './rest/restapporder.service';
import {RestService} from './rest/rest.service';
import {RestuserService} from './rest/restuser.service';
import {LocalstorageService} from './localstorage.service';
import {MatDialog} from "@angular/material/dialog";
import {UserlogindialogComponent} from "./dialogs/userlogindialog/userlogindialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  amount;
  showUpdate = true;
  showUpdateCanceled = true;
  users;
  userSelected;

  constructor(public rest: RestService, public restNotif: RestnotifService, public restOrder: RestorderService,
              public restAppOrders: RestapporderService, public matDialog: MatDialog,
              private userRest: RestuserService, public localStorageService: LocalstorageService) {
  }

  ngOnInit() {
    this.restNotif.getUnreadAmount().subscribe(value => {
      this.amount = value;
    });
    this.restAppOrders.setAmounts();
    this.userRest.getAllUsers().subscribe(value => {
      this.users = value;
    });
    // @ts-ignore
    this.userRest.checkIfUserLoggedIn(this.localStorageService.getUser()).subscribe(value => {
      // @ts-ignore
      this.userSelected = this.localStorageService.getUser();
    });
    // this.userSelected = this.localStorageService.getUser();
  }

  update() {
    this.showUpdate = false;
    this.restOrder.updateStatusesWithoutResponse().subscribe(() => {
      this.showUpdate = true;
    });
  }

  updateCanceled() {
    this.showUpdateCanceled = false;
    this.rest.updateCanceled().subscribe(() => {
      this.showUpdateCanceled = true;
    });
  }

  onUserChange(event) {
    const loginUserDialog = this.matDialog.open(UserlogindialogComponent, {data: event});
    loginUserDialog.afterClosed().subscribe(value => {
      if (value) {
        this.localStorageService.writeUser(event);
      } else {
        this.userSelected = null;
      }
    });
  }

}

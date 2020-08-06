import {Component, OnInit} from '@angular/core';
import {RestnotifService} from '../rest/restnotif.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notification;

  constructor(private restNotif: RestnotifService) {
  }

  ngOnInit() {
    this.restNotif.getNotifications(0).subscribe(value => {
      this.notification = value;
    });
  }

  makeRead(message) {
    this.restNotif.read(message.id).subscribe(value => {
      this.restNotif.getUnreadAmount().subscribe(value1 => {
        this.restNotif.amountNotif = value1;
        this.restNotif.getNotifications(0).subscribe(value => {
          this.notification = value;
        });
      });
    });
  }

  updateNotif(event) {
    this.restNotif.getNotifications(event.pageIndex).subscribe(value => {
      this.notification = value;
    });  }


}

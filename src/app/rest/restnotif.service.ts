import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Configuration} from '../configuration';

@Injectable({
  providedIn: 'root'
})
export class RestnotifService {

  public amountNotif;

  constructor(private http: HttpClient, private configuration: Configuration) {
    this.getUnreadAmount().subscribe(value => {
      this.amountNotif = value;
    });
  }

  public getNotifications(page, read = null) {
    return this.http.get(this.configuration.serverpath + 'notifications?size=10&page=' + page);
  }

  public read(id) {
    return this.http.put(this.configuration.serverpath + 'notifications/read?id=' + id, this.getHttpOptions());
  }

  public getUnreadAmount() {
    return this.http.get(this.configuration.serverpath + 'notifications/unreadAmount');
  }

  public updateUnreadAmount() {
    this.getUnreadAmount().subscribe(value => {
      this.amountNotif = value;
    });
  }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
}

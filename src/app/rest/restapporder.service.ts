import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Configuration} from '../configuration';

@Injectable({
  providedIn: 'root'
})
export class RestapporderService {

  public newAppOrders = 0;

  constructor(private http: HttpClient, private configuration: Configuration) {
  }

  public getAppOrders(id, phoneAndName, fromForNotReady, fromForReady) {
    if (id == null) {
      id = '';
    }
    if (phoneAndName == null) {
      phoneAndName = '';
    }
    return this.http.get(this.configuration.serverpath + 'AppOrder?id=' + id + '&phoneAndName=' + phoneAndName + '&fromForNotReady='
      + fromForNotReady + '&fromForReady=' + fromForReady);
  }

  public getStatuses() {
    return this.http.get(this.configuration.serverpath + 'AppOrder/statuses');
  }

  public changeAppOrder(changeStatusRequest) {
    return this.http.patch(this.configuration.serverpath + 'AppOrder/changeStatusAndComment', changeStatusRequest);
  }

  public addComment(addCommentRequest) {
    return this.http.patch(this.configuration.serverpath + 'AppOrder/addCommnet', addCommentRequest);
  }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Configuration} from '../configuration';
import {LocalstorageService} from '../localstorage.service';
import {StringResponse} from '../entity/response/StringResponse';

@Injectable({
  providedIn: 'root'
})
export class OurttnsService {

  constructor(private http: HttpClient, private configuration: Configuration, private localStorageService: LocalstorageService) {
  }

  public getAll(page, size, showDeletedAndReceived = false) {
    return this.http.get(this.configuration.serverpath + 'ourttn?page=' + page + '&showDeletedAndReceived=' + showDeletedAndReceived
      + '&size=' + size);
  }

  public importOurTtns(ttns2: string, npAccountId: number) {
    let ttns3;
    if (ttns2 != null) {
      ttns3 = ttns2.split('\n').join(' ');
    } else {
      ttns3 = '';
    }
    return this.http.post<StringResponse>(this.configuration.serverpath + 'ourttn', {
        ttns: ttns3,
        userId: this.localStorageService.getUser(),
        npAccountId: npAccountId
      },
      this.getHttpOptions());
  }

  public updateOurTtns() {
    return this.http.patch(this.configuration.serverpath + 'ourttn/updateStatuses', this.getHttpOptions());
  }

  public getNpAccounts() {
    return this.http.get(this.configuration.serverpath + 'npAccountAndCard');
  }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

}

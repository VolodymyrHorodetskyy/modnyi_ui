import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Configuration} from "../configuration";
import {LocalstorageService} from "../localstorage.service";

@Injectable({
  providedIn: 'root'
})
export class RestNpControlService {

  constructor(private http: HttpClient, private configuration: Configuration, private localStorageService: LocalstorageService) {
  }

  getCards() {
    return this.http.get(this.configuration.serverpath + 'npAccountAndCard/getCards');
  }

  getActualCard() {
    return this.http.get(this.configuration.serverpath + 'npAccountAndCard/getActualCard');
  }

  getCardSum(cardId, npAccountId, from, to) {
    return this.http.get(this.configuration.serverpath + 'npAccountAndCard/cardSpends?cardId=' + cardId
      + '&from=' + from + '&to=' + to + '&npAccountId=' + npAccountId);
  }

  getNpAccounts() {
    return this.http.get(this.configuration.serverpath + 'npAccountAndCard/getNpAccounts');
  }

  getRedeliveryStatsByNpAccount(dateFrom, dateTo, npAccountId = null) {
    return this.http.get(this.configuration.serverpath +
      'statistic/getRedeliveryStatsByNpAccount?dateFrom=' + dateFrom + '&dateTo=' + dateTo + '&npAccountId=' + npAccountId)
  }

  getSaveParamsForNpAccount() {
    return this.http.get(this.configuration.serverpath + 'npAccountAndCard/getSaveParamsForNpAccount')
  }

}

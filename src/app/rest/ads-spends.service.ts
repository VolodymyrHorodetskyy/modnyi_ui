import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Configuration} from "../configuration";

@Injectable({
  providedIn: 'root'
})
export class AdsSpendsService {

  constructor(private http: HttpClient, private configuration: Configuration) {
  }

  saveAdsSpends(adsSpends) {
    return this.http.post(this.configuration.serverpath + 'AdsSpends', adsSpends, this.getHttpOptions());
  }

  getFinanceStatsStringResponse(dateFrom, dateTo) {
    return this.http.get(this.configuration.serverpath + 'AdsSpends/getFinanceStatsString?from=' + dateFrom + '&to=' + dateTo);
  }

  getMarking(modelAndColor = '', size = '', ttn = '', printed = false) {
    return this.http.get(this.configuration.serverpath
      + 'markings?modelAndColor=' + modelAndColor + '&size=' + size + '&ttn=' + ttn + '&showPrinted=' + printed);
  }

  setPrinted(orderId) {
    return this.http.patch(this.configuration.serverpath + 'markings/setPrinted?id=' + orderId, this.getHttpOptions());
  }

  getSpendTypes() {
    return this.http.get(this.configuration.serverpath + 'AdsSpends/getSpendTypes');
  }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

}

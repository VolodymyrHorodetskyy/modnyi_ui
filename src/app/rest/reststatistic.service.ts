import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Configuration} from '../configuration';

@Injectable({
  providedIn: 'root'
})
export class ReststatisticService {

  constructor(private http: HttpClient, private configuration: Configuration) {
  }

  public getSoldShoes(dateFrom, dateTo, status) {
    let url = this.configuration.serverpath + 'statistic/getSoldShoeRating?from=' + dateFrom + '&to=' + dateTo;
    if (status != null) {
      url += '&status=' + status;
    }
    return this.http.get(url);
  }

  public getShoeOrdersStatsGoogleCharts(from, to, status) {
    const url = this.configuration.serverpath + 'statistic/getStatisticGoogleChart?from=' + from + '&to=' + to;
    if (status == null) {
      return this.http.get(url);
    } else {
      return this.http.get(url + '&status=' + status);
    }
  }

  public getStatShoe(dateFrom, dateTo, field = null, direction = null) {
    return this.http.get(this.configuration.serverpath + 'statistic/getReceivedShoePercentage?from=' + dateFrom + '&to=' + dateTo);
  }

  public getOrdersAndAppOrdersByPhone(id) {
    return this.http.get(this.configuration.serverpath + 'statistic/getOrdersAndAppOrdersByPhone?id=' + id);
  }

}

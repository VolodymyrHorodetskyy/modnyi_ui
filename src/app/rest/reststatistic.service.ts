import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Configuration} from '../configuration';
import {from} from 'rxjs';

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

  public getStatShoe(dateFrom, dateTo, field = null, direction = null) {
    return this.http.get(this.configuration.serverpath + 'statistic/getReceivedShoePercentage?from=' + dateFrom + '&to=' + dateTo);
  }

}

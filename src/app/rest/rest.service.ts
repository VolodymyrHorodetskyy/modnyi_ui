import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Configuration} from '../configuration';
import {Shoe} from '../entity/Shoe';
import {StatusDto} from '../entity/StatusDto';
import {StringResponse} from '../entity/response/StringResponse';
import {CancelOrderRequest} from '../entity/CancelOrderRequest';
import {LocalstorageService} from '../localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient, private configuration: Configuration, private localStorageService: LocalstorageService) {
  }

  public getItems(model) {
    if (model === null) {
      return this.http.get<Shoe[]>(this.configuration.serverpath + 'shoe?page=0&size=100');
    } else {
      return this.http.get<Shoe[]>(this.configuration.serverpath + 'shoe?modelAndColor=' + model + '&page=0&size=100');
    }
  }


  public getStatuses() {
    return this.http.get<StatusDto[]>(this.configuration.serverpath + 'order/getStatuses');
  }

  public importTTNS(ttns2: string, discountId) {
    let ttns3;
    if (ttns2 != null) {
      ttns3 = ttns2.split('\n').join(' ');
    } else {
      ttns3 = '';
    }
    return this.http.post<StringResponse>(this.configuration.serverpath + 'order/importOrdersByTTNsString', {
        ttns: ttns3,
        userId: this.localStorageService.getUser(),
        discountId: discountId
      },
      this.getHttpOptions());

  }

  public needDelivery(updateFromDb = false) {
    return this.http.get<StringResponse>(this.configuration.serverpath + 'statistic/needDeliveryFromDB?updateStatuses='
      + updateFromDb, this.getHttpOptions());
  }

  public getIssueOrders() {
    return this.http.get<StringResponse>(this.configuration.serverpath + 'statistic/getIssueOrdered', this.getHttpOptions());
  }

  public getNeedToBePayed(updateStatuses = false) {
    return this.http.post<StringResponse>(this.configuration.serverpath + 'statistic/needToPayedFromFile?updateStatuses='
      + updateStatuses, this.getHttpOptions());
  }

  public getReturned(showClientTTN = false, showOnlyDelivered = false) {
    return this.http.get<StringResponse>(this.configuration.serverpath + 'statistic/returned?showClientTTN=' + showClientTTN
      + '&showOnlyDelivered=' + showOnlyDelivered, this.getHttpOptions());
  }

  public getCanceled(updateStatuses = false) {
    return this.http.get<StringResponse>(this.configuration.serverpath +
      '/statistic/canceled?updateStatuses=' + updateStatuses, this.getHttpOptions());
  }

  public returnOrders(updateStatuses = false) {
    return this.http.get<StringResponse>(this.configuration.serverpath +
      '/order/returnCargo?updateStatuses=' + updateStatuses, this.getHttpOptions());
  }

  public getReasons() {
    return this.http.get<string[]>(this.configuration.serverpath + 'order/getReasons');
  }

  public cancelOrder(request: CancelOrderRequest) {
    return this.http.patch(this.configuration.serverpath + 'CancelOrder/cancelOrder', request, this.getHttpOptions());
  }

  public getCanceledOrders(page, size, phoneOrName, ttn, manual, withoutReason, userId) {
    return this.http.get(this.configuration.serverpath + 'CancelOrder?page=' + page + '&size=' + size +
      '&phoneOrName=' + phoneOrName + '&ttn=' + ttn + '&manual=' + manual + '&withoutReason=' + withoutReason + '&userId=' + userId);
  }

  public setCanceled(setCanceledRequest) {
    return this.http.patch(this.configuration.serverpath + 'CancelOrder/setReason', setCanceledRequest, this.getHttpOptions());
  }

  public getEarnings(dateFrom = '', dateTo = '') {
    if (dateFrom == null) {
      dateFrom = '';
    }
    if (dateTo == null) {
      dateTo = '';
    }
    return this.http.get(this.configuration.serverpath + 'finance/getEarningString?from=' + dateFrom + '&to=' + dateTo);
  }

  public getCancelOrderReasonByOrderId(orderId) {
    return this.http.get(this.configuration.serverpath + 'CancelOrder/getCanceledOrderByOrderId?id=' + orderId);
  }

  public getCancelOrderReason(id) {
    return this.http.get(this.configuration.serverpath + 'CancelOrder/getCanceledOrder?id=' + id);
  }

  public createShoe(createShoeRequest) {
    return this.http.post(this.configuration.serverpath + 'shoe', createShoeRequest);
  }

  public updateShoe(updateShoeRequest) {
    return this.http.patch(this.configuration.serverpath + 'shoe', updateShoeRequest);
  }

  public deleteShoe(id) {
    return this.http.delete(this.configuration.serverpath + 'shoe?id=' + id);
  }

  public addPattern(createPattern) {
    return this.http.patch(this.configuration.serverpath + 'shoe/addPattern', createPattern, this.getHttpOptions());
  }

  public deletePattern(deletePattern) {
    return this.http.patch(this.configuration.serverpath + 'shoe/removePattern', deletePattern);
  }

  public getCompanies() {
    return this.http.get(this.configuration.serverpath + 'company');
  }

  public updateCanceled() {
    return this.http.put(this.configuration.serverpath + 'CancelOrder/updateCanceled', this.getHttpOptions());
  }

  public getUserStats(userId) {
    return this.http.get(this.configuration.serverpath + 'statistic/getAllOrdersByUser?userId=' + userId);
  }


  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }


}

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Configuration} from '../configuration';
import {Shoe} from '../entity/Shoe';
import {Ordered} from '../entity/Ordered';
import {FromNPToOrderRequest} from '../entity/FromNPToOrderRequest';
import {GetAllOrderedResponse} from '../entity/response/GetAllOrderedResponse';
import {StatusDto} from '../entity/StatusDto';
import {StorageRecord} from '../entity/StorageRecord';
import {StringResponse} from '../entity/response/StringResponse';
import {CancelOrderRequest} from '../entity/CancelOrderRequest';
import {from} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient, private configuration: Configuration) {
  }

  public getItems(model) {
    if (model === null) {
      return this.http.get<Shoe[]>(this.configuration.serverpath + '/shoe?page=0&size=100');
    } else {
      return this.http.get<Shoe[]>(this.configuration.serverpath + '/shoe?model=' + model + '&page=0&size=100');
    }
  }

  public getOrders(page, size, ttn = '', phone = '', withoutTTN = false, orderBy: string) {
    return this.http.get<GetAllOrderedResponse>(this.configuration.serverpath + '/order?page=' + page + '&size=+' + size + '&ttn=' + ttn + '&phone=' + phone + '&withoutTTN=' + withoutTTN + '&orderBy=' + orderBy);
  }

  public getOrderedNP(phone, ttn) {
    const request: FromNPToOrderRequest = new FromNPToOrderRequest();
    request.phone = phone;
    request.ttn = ttn;
    return this.http.post<Ordered>(this.configuration.serverpath + '/order/fromNP', request, this.getHttpOptions());
  }

  public saveOrder(createorderrequest) {
    return this.http.post<Ordered>(this.configuration.serverpath + '/order', createorderrequest, this.getHttpOptions());
  }

  public updateOrder(id, updateOrderRequest) {
    return this.http.patch<Ordered>(this.configuration.serverpath + '/order/' + id, updateOrderRequest, this.getHttpOptions());
  }

  public getStatuses() {
    return this.http.get<StatusDto[]>(this.configuration.serverpath + '/order/getStatuses');
  }

  public checkShoeIsPresentInStorage(shoeId, size) {
    return this.http.get<boolean>(this.configuration.serverpath + '/storage/isExists?shoeId=' + shoeId + '&size=' + size);
  }

  public importTTNS(ttns2: string) {
    let ttns3;
    if (ttns2 != null) {
      ttns3 = ttns2.split('\n').join(' ');
    } else {
      ttns3 = '';
    }
    return this.http.post<StringResponse>(this.configuration.serverpath + '/order/importOrdersByTTNsString', {
        ttns: ttns3
      },
      this.getHttpOptions());

  }

  public needDelivery(updateFromDb = false) {
    return this.http.get<StringResponse>(this.configuration.serverpath + '/statistic/needDeliveryFromDB?updateStatuses=' + updateFromDb, this.getHttpOptions());
  }

  public getIssueOrders() {
    return this.http.get<StringResponse>(this.configuration.serverpath + '/statistic/getIssueOrdered', this.getHttpOptions());
  }

  public getNeedToBePayed(updateStatuses = false, fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    const headers = new HttpHeaders()
      .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'POST')
      .append('reportProgress', 'true');
    return this.http.post<StringResponse>(this.configuration.serverpath + '/statistic/needToPayedFromFile?updateStatuses=' + updateStatuses,
      formData, {headers});
  }

  public getReturned(excludeFromDeliveryFile = false) {
    return this.http.get<StringResponse>(this.configuration.serverpath + '/statistic/returned?setNotForDelivery=' + excludeFromDeliveryFile
      , this.getHttpOptions());
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
    return this.http.get<string[]>(this.configuration.serverpath + '/order/getReasons');
  }

  public cancelOrder(request: CancelOrderRequest) {
    return this.http.patch(this.configuration.serverpath + '/order/cancelOrder', request, this.getHttpOptions());
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

  public getCancelOrderReason(id) {
    return this.http.get(this.configuration.serverpath + '/order/getCanceledOrder?id=' + id);
  }

  public createShoe(createShoeRequest) {
    return this.http.post(this.configuration.serverpath + '/shoe', createShoeRequest);
  }

  public updateShoe(updateShoeRequest) {
    return this.http.patch(this.configuration.serverpath + '/shoe', updateShoeRequest);
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

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

}

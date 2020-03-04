import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Configuration} from '../configuration';
import {Shoe} from '../entity/Shoe';
import {Ordered} from '../entity/Ordered';
import {FromNPToOrderRequest} from '../entity/FromNPToOrderRequest';
import {GetAllOrderedResponse} from '../entity/GetAllOrderedResponse';
import {StatusDto} from '../entity/StatusDto';
import {StorageRecord} from '../entity/StorageRecord';

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

  public createStorageRecord(createstoragerequest) {
    return this.http.post<StorageRecord>(this.configuration.serverpath + '/storage', createstoragerequest, this.getHttpOptions());
  }

  public getStorageRecords() {
    return this.http.get<StorageRecord[]>(this.configuration.serverpath + '/storage', this.getHttpOptions());
  }

  public checkShoeIsPresentInStorage(shoeId, size) {
    return this.http.get<boolean>(this.configuration.serverpath + '/storage/isExists?shoeId=' + shoeId + '&size=' + size);
  }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

}

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Configuration} from '../configuration';
import {GetAllOrderedResponse} from '../entity/response/GetAllOrderedResponse';
import {FromNPToOrderRequest} from '../entity/FromNPToOrderRequest';
import {Ordered} from '../entity/Ordered';

@Injectable({
  providedIn: 'root'
})
export class RestorderService {

  constructor(private http: HttpClient, private configuration: Configuration) {
  }

  public getOrders(page, size, ttn = '', phone = '', withoutTTN = false, orderBy: string) {
    return this.http.get<GetAllOrderedResponse>(
      this.configuration.serverpath + 'order?page=' + page +
      '&size=+' + size + '&ttn=' + ttn + '&phoneOrName=' + phone + '&withoutTTN=' + withoutTTN + '&orderBy=' + orderBy);
  }

  public getOrderedNP(phone, ttn) {
    const request: FromNPToOrderRequest = new FromNPToOrderRequest();
    request.phone = phone;
    request.ttn = ttn;
    return this.http.post<Ordered>(this.configuration.serverpath + 'order/fromNP', request);
  }

  public saveOrder(createorderrequest) {
    return this.http.post<Ordered>(this.configuration.serverpath + '/order', createorderrequest);
  }

  public updateOrder(id, updateOrderRequest) {
    return this.http.patch<Ordered>(this.configuration.serverpath + 'order/' + id, updateOrderRequest);
  }

  public addShoeToOrder(addShoeToOrder) {
    return this.http.put<Ordered>(this.configuration.serverpath + 'order/addShoeToOrder', addShoeToOrder);
  }

  public makeAllPayed() {
    return this.http.patch(this.configuration.serverpath + 'order/makeAllPayed', this.getHttpOptions());
  }

  public updateStatuses() {
    return this.http.patch(this.configuration.serverpath + 'order/updateStatuses', this.getHttpOptions());
  }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }


}

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Configuration} from '../configuration';
import {Shoe} from '../entity/Shoe';
import {Ordered} from '../entity/Ordered';
import {FromNPToOrderRequest} from '../entity/FromNPToOrderRequest';
import {GetAllOrderedResponse} from '../entity/GetAllOrderedResponse';

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
      return this.http.get<Shoe[]>(this.configuration.serverpath + '/shoe?model=' + model + '&page=0&size=10');
    }
  }

  public getOrders(page, size, ttn = '') {
    return this.http.get<GetAllOrderedResponse>(this.configuration.serverpath + '/order?page=' + page + '&size=+' + size + '&ttn=' + ttn);
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

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

}

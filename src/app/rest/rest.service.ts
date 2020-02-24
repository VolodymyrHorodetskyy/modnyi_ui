import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Configuration} from '../configuration';
import {Shoe} from '../entity/Shoe';
import {Ordered} from '../entity/Ordered';
import {FromNPToOrderRequest} from '../entity/FromNPToOrderRequest';

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

  public getOrders() {
    return this.http.get<Ordered[]>(this.configuration.serverpath + '/order');
  }

  public getOrderedNP(phone, ttn) {
    const request: FromNPToOrderRequest = new FromNPToOrderRequest();
    request.phone = phone;
    request.ttn = ttn;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Ordered>(this.configuration.serverpath + '/order/fromNP', request, httpOptions);
  }

  public saveOrder(createorderrequest) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Ordered>(this.configuration.serverpath + '/order', createorderrequest, httpOptions);
  }

}

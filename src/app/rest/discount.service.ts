import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Configuration} from '../configuration';
import {LocalstorageService} from '../localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private http: HttpClient, private configuration: Configuration, private localStorageService: LocalstorageService) {
  }

  public getAll() {
    return this.http.get(this.configuration.serverpath + 'discount');
  }

  public getShoePrice(shoeIds, discountId) {
    let shoeIdsString = '';
    let first = true;
    if (shoeIds.length !== 0) {
      for (const shoeId of shoeIds) {
        if (!first) {
          shoeIdsString += ',';
        }
        first = false;
        shoeIdsString += shoeId;
      }
    } else {
      // @ts-ignore
      shoeIdsString = '';
    }
    if (discountId == null) {
      discountId = 0;
    }
    return this.http.get<number>(this.configuration.serverpath + 'shoe/getShoePrice?discountId=' +
      discountId + '&shoeIds=' + shoeIdsString);
  }


}

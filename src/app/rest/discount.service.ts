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

}

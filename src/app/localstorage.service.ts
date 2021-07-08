import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  private user = 'user';

  constructor() {
  }

  getUser(): number {
    // tslint:disable-next-line:radix
    return parseInt(localStorage.getItem(this.user));
  }

  writeUser(id: number) {
    localStorage.setItem(this.user, id.toString());
  }

  emptyUser(){
    localStorage.setItem(this.user, null);
  }

}

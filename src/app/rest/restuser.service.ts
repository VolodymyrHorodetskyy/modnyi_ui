import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Configuration} from '../configuration';

@Injectable({
  providedIn: 'root'
})
export class RestuserService {

  constructor(private http: HttpClient, private configuration: Configuration) {
  }

  public getAllUsers() {
    return this.http.get(this.configuration.serverpath + 'user');
  }

  public logIn(userLogInRequest) {
    return this.http.post(this.configuration.serverpath + 'user', userLogInRequest);
  }

  public checkIfUserLoggedIn(id: number) {
    return this.http.get(this.configuration.serverpath + 'user/userLoggedIn?id=' + id);
  }

}

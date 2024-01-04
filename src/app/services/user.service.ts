import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './user.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  //create User
  public createuser(user:any) {
    return this.http.post(`${baseURL}/user`, user)
  }
}

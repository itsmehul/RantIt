import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }
  registerUser(user) {
    let headers = new Headers();
    //set content type
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      //server URL (check routes/users)
      'http://localhost:3000/users/register', 
      //user data
      user, { headers: headers })
      //convert observable data to json format
      .map(res => res.json());
  }}
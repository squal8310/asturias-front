import { Injectable } from '@angular/core';
import Axios, { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { LoginObject } from './models/login-object.model';
import { Session } from './models/session.model';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  private basePath = '/api/authenticate/';

 login = (loginObj: LoginObject) =>{
  return Axios.get<String>('https://599d6a620a785b0011f4f6c8.mockapi.io/users');
 }

 logout = ()=> {
  return Axios.get<String>('https://599d6a620a785b0011f4f6c8.mockapi.io/users');
 }

 private extractData(res: Response) {
 let body = res.json();
 return body;
 }
}

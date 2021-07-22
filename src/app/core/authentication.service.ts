import { Injectable } from '@angular/core';
import Axios, { AxiosResponse } from 'axios';
import { URL } from 'src/environments/environment';
import { LoginObject } from './models/login-object.model';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  private basePath = '/api/';
  private tokenOa = 'oauth/token'

  loginFetch = (lO:LoginObject)=>{
    
    return fetch(URL+ "/oauth/token", {
      method: 'POST',
      body: 'grant_type=password&username='+lO.username+ '&password=' + lO.password,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic YXN0dXJpYXNhcHA6c2VjcmV0'
      }
    });      
  }

  getParamsTkn = (username:string, pass:string):string=>{
    return  `username=${username}&grant_type=password&password=${pass}`;
  }

 logout = ()=> {
  return Axios.get<String>('https://599d6a620a785b0011f4f6c8.mockapi.io/users');
 }

}

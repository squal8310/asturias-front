import {  Injectable } from '@angular/core';
import {  Observable, Subject } from 'rxjs';
import { REFRESH_TOKEN, TOKEN } from 'src/app/shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService<T> {

  private subcription = new Subject<T>();
  token:String;
  
  constructor() { }

  getemited(): Observable<T> {
    return this.subcription.asObservable();
  }

  emit(message: T) {
    this.subcription.next(message)
  }

  setToken=(token?:string):void=>{
    if(!token){
      localStorage.setItem(TOKEN, '');
    }else{
      localStorage.setItem(TOKEN, token);
    }
  }

  isActiveSession=():Boolean =>{
    return localStorage.getItem('isLoggedIn')?true:false;
  }

  setActiveSession = (value: Boolean): void => {
    return localStorage.setItem('isLoggedIn', value.toString());
  }


  getToken=():String=>{
    console.log("fetch --------> token: ",this.token);
    if(!localStorage.getItem(TOKEN)){
      return;
    }
    this.token = localStorage.getItem(TOKEN);
    return this.token;
  }

  setRefreshToken=(token?: string):void=>{
    if(!token){
      localStorage.setItem('isLoggedIn','');
    }else{
      localStorage.setItem(REFRESH_TOKEN, token);
    }
  }
}

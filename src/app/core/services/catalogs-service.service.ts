import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';
import { URL } from 'src/environments/environment';
import { StorageService } from '../storage.service';
import { CommonServiceService } from './common-service.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogsServiceService {

  constructor(private stServ: StorageService) { }

  getMenu=(catNum: number)=>{
    let tokendtr = this.stServ.getCurrentSession();
   console.log("--------> ", tokendtr);
    return fetch(URL+ "/api/menu/list", {
      method: 'POST',
      body: JSON.stringify({attr1: catNum}),
      headers: {
        "Authorization": `Bearer ${tokendtr.token}`,
        "Content-Type": "application/json"
      }
    }); 
  }

  getCategories=(catNum: number)=>{
    let tokendtr = this.stServ.getCurrentSession();
   console.log("--------> ", tokendtr);
    return fetch(URL+ "/api/categories/list", {
      method: 'POST',
      body: JSON.stringify({attr1: catNum}),
      headers: {
        "Authorization": `Bearer ${tokendtr.token}`,
        "Content-Type": "application/json"
      }
    }); 
  }

  getPositions=(catNum: number)=>{
    let tokendtr = this.stServ.getCurrentSession();
   console.log("--------> ", tokendtr);
    return fetch(URL+ "/api/categories/list", {
      method: 'POST',
      body: JSON.stringify({attr1: catNum}),
      headers: {
        "Authorization": `Bearer ${tokendtr.token}`,
        "Content-Type": "application/json"
      }
    }); 
  }

}

import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CatalogsServiceService {

  constructor() { }

  getCategories=(catNum: number)=>{
    return axios.post("http://localhost:8080/categories/list", {attr1: catNum});
  }

  getCategoriesAnd=(catNum1: number, catNum2:number)=>{
    return axios.post("http://localhost:8080/categories/list", {attr1: catNum1, attr2: catNum2 });
  }
}

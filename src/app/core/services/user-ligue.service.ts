import { Injectable } from '@angular/core';
import { URL } from 'src/environments/environment';
import { FormatCredentialsVO } from '../models/categories.model copy';
import { UserLigue } from '../models/user-ligue.model';
import { StorageService } from '../storage.service';


@Injectable({
  providedIn: 'root'
})
export class UserLigueService {

  constructor(private stServ: StorageService) { }

  save=(tipo:number)=>{
    let userLigue: UserLigue= new UserLigue();
    let formDataJs = JSON.parse( window['formRegisterDelegates']);
    const tokendt = this.stServ.getCurrentSession();
    userLigue.cat = formDataJs['category'];
    userLigue.subcategoria1 = formDataJs['subCategory1'];
    userLigue.subcategoria2 = formDataJs['subCategory2'];
    userLigue.subcategoria3 = formDataJs['subCategory3'];
    userLigue.name = formDataJs['name'];
    userLigue.lastName = formDataJs['lastName'];
    userLigue.curp = formDataJs['curp'];
    userLigue.position = formDataJs['position'];
    userLigue.noPlayer = formDataJs['number'];
    userLigue.tipo = tipo;
     return fetch(`${URL}/public/players/register`, {
       method: 'POST',
       body: JSON.stringify(userLigue),
       headers: {
         "Authorization": `Bearer ${tokendt.token}`,
         "Content-Type": "application/json"
       }
     }); 
  }

  get=(club:string)=>{
    
    const tokendt = this.stServ.getCurrentSession();
  
     return fetch(`${URL}/public/players/list/${club}/${0}/${10}`, {
       method: 'POST',
       body: JSON.stringify({}),
       headers: {
         "Authorization": `Bearer ${tokendt.token}`,
         "Content-Type": "application/json"
       }
     }); 
  }

  getCredentials = (club: string, front: boolean, download:Boolean)=>{
    const tokendt = this.stServ.getCurrentSession();
    let formatCred: FormatCredentialsVO = new FormatCredentialsVO();
    formatCred.club = club;
    formatCred.front = front;
    formatCred.download = download;
     return fetch(`${URL}/public/players/credentials`, {
       method: 'POST',
       body: JSON.stringify(formatCred),
       headers: {
        "Content-Type": "application/json"
       }
     }); 
  }

  getById = (id: string)=>{
    const tokendt = this.stServ.getCurrentSession();
  
     return fetch(`${URL}/public/players/get/${id}`, {
       method: 'POST',
       body: JSON.stringify({}),
       headers: {
        "Authorization": `Bearer ${tokendt.token}`
       }
     }); 
  }
}

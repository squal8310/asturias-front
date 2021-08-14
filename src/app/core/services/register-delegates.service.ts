import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import axios from 'axios';
import { URL } from 'src/environments/environment';
import { UserLigue } from '../models/user-ligue.model';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterDelegatesService {

 
  constructor(private stServ: StorageService) { }

  getAllClubs=()=>{
    const tokendt = this.stServ.getCurrentSession();
    return fetch(`${URL}/api/delegates/list/2`, {
      method: 'POST',
      body: "",
      headers: {
        "Authorization": `Bearer ${tokendt.token}`,
        "Content-Type": "application/json"
      }
    }); 
  }

  savePlayers=(typeUser:number)=>{
    let userLigue: UserLigue= new UserLigue();
    let formDataJs = JSON.parse( window['formRegisterDelegates']);
    const tokendt = this.stServ.getCurrentSession();
    userLigue.cat = formDataJs['category'];
    userLigue.subcategoria1 = formDataJs['subCategory1'];
    userLigue.subcategoria2 = formDataJs['subCategory2'];
    userLigue.subcategoria3 = formDataJs['subCategory3'];
    userLigue.club = formDataJs['club'];
    userLigue.name = formDataJs['name'];
    userLigue.lastName = formDataJs['lastName'];
    userLigue.curp = formDataJs['curp'];
    userLigue.position = formDataJs['position'];
    userLigue.noPlayer = formDataJs['number'];
    userLigue.tipo = typeUser;
    userLigue.dateBirth = formDataJs['dateBirth'];
    
     return fetch(`${URL}/api/players/register`, {
       method: 'POST',
       body: JSON.stringify(userLigue),
       headers: {
         "Authorization": `Bearer ${tokendt.token}`,
         "Content-Type": "application/json"
       }
     }); 
  }
}

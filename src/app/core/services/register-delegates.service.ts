import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { URL, USERS_LIGUE_DB } from 'src/environments/environment';
import { UserLigue } from '../models/user-ligue.model';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterDelegatesService {

 
  constructor(private stServ: StorageService, private db: AngularFireDatabase) { }

  getAllClubs=()=>{
    const tokendt = this.stServ.getCurrentSession();
    return fetch(`${URL}/public/delegates/list/2`, {
      method: 'POST',
      body: "",
      headers: {
        "Authorization": `Bearer ${tokendt.token}`,
        "Content-Type": "application/json"
      }
    }); 
  }

  changePasswordUser=(form:NgForm)=>{
    let userLigue: UserLigue= new UserLigue();
    let changePasswordDelegate= 'public/delegates/changepassword';
    let formDataJs = JSON.parse(window['formrecoveryDelegates']);
    userLigue.user = form.controls.user.value;
    userLigue.password = form.controls.password.value;
    return fetch(`${URL}/${changePasswordDelegate}`, {
      method: 'POST',
      body: JSON.stringify(userLigue),
      headers: this.checkIfApiPublic(2)
    }); 
  }

  checkIfApiPublic=(typeUser:number)=>{
    
    const tokendt = this.stServ.getCurrentSession();
    let hdApi= {
              "Authorization": `Bearer ${tokendt.token}`,
              "Content-Type": "application/json"
            };
   let hdPublic= {
                "Content-Type": "application/json"
              };

        return typeUser === 2? hdPublic: hdApi;
  }
}

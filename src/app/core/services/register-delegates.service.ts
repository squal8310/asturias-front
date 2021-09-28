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

  saveUser=(form:NgForm, typeUser:number)=>{
    console.log("REG USER");
    let userLigue: UserLigue= new UserLigue();
    userLigue.cat = form.controls.category.value;
    userLigue.subcategoria1 = form.controls.subCategory1.value != undefined ? form.controls.subCategory1.value : "";
    userLigue.subcategoria2 = form.controls.subCategory2.value != undefined ? form.controls.subCategory2.value : "";
    userLigue.subcategoria3 = form.controls.subCategory3.value != undefined ? form.controls.subCategory3.value : "";
    userLigue.club =  this.stServ.getCurrentSession().user.club;
    userLigue.name = form.controls.name.value;
    userLigue.lastName = form.controls.lastName.value;
    userLigue.curp = form.controls.curp.value;
    userLigue.position = form.controls.position.value;
    userLigue.noPlayer = form.controls.number.value;
    userLigue.tipo = typeUser;
    userLigue.dateBirth = form.controls.dateBirth.value;
    userLigue.rol = 'PLAYER';
    userLigue.user = this.stServ.getCurrentSession().user.email;

      return new Promise((resolve, reject)=>{
        this.db.list(`${USERS_LIGUE_DB}/PLAYER`).push(userLigue).
        then(created=>{
          console.log("CREATED: ", created)
          // if(created){
          //   created.then(item=>{
          //     resolve(item.key);
          //   });
          // }else{
          //   reject("No se creo el Jugador");
          // }
        });
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

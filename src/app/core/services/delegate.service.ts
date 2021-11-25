import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { URL, USERS_LIGUE_DB } from 'src/environments/environment';
import { Cat } from '../models/cat.model';
import { Player } from '../models/player.model';
import { User } from '../models/user.model';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class DelegateService {

  
  private user: User;
  constructor(private stServ: StorageService, private db: AngularFireDatabase) { 
    this.user = this.stServ.getCurrentUser();
  }


  get=(club:string)=>{
    
    const tokendt = this.stServ.getCurrentSession();
  
     return fetch(`${URL}/api/players/list/${club}/${0}/${100}`, {
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
    let formatCred: any;
    formatCred.club = club;
    formatCred.front = front;
    formatCred.download = download;
     return fetch(`${URL}/api/players/credentials`, {
       method: 'POST',
       body: JSON.stringify(formatCred),
       headers: {
        "Content-Type": "application/json"
       }
     }); 
  }

  getById = (id: string)=>{
    const tokendt = this.stServ.getCurrentSession();
  
     return fetch(`${URL}/api/players/get/${id}`, {
       method: 'POST',
       body: JSON.stringify({}),
       headers: {
        "Authorization": `Bearer ${tokendt.token}`
       }
     }); 
  }

  getByUserLogged = (mail:string): AngularFireList<Player>=>{
     return this.db.list(`DELEGATES`, ref=>ref.orderByChild('user').equalTo(`${mail}`));
  }

  getAllPlayersByUser = (email: string): AngularFireList<Player[]>=>{
    return this.db.list(`${USERS_LIGUE_DB}/PLAYER/${this.stServ.getCurrentSession().user.club}`,
            ref=>ref.orderByChild('user').equalTo(`${email}`));
  }

  removePlayerPlayer = (idUserToRemove:string): void=>{
    this.user = this.stServ.getCurrentUser();
    this.db.list(`${USERS_LIGUE_DB}/PLAYER/${this.stServ.getCurrentSession().user.club}/${idUserToRemove}`).remove();
  }

  getUserDocumentBy = (idUserToRemove:string): void=>{
    this.user = this.stServ.getCurrentUser();
    this.db.list(`${USERS_LIGUE_DB}/PLAYER/${this.stServ.getCurrentSession().user.club}${idUserToRemove}`).remove();
  }

  getPlayersByClubAndCategory = (club:string, cat:string, subcategoria1:string):  AngularFireList<Player[]>=>{
  
    if(cat !== '0' && subcategoria1 === '0'){
      return this.db.list(`${USERS_LIGUE_DB}/PLAYER/${club}`,
      ref=>ref.orderByChild('cat').equalTo(`${cat}`));
    }

    if(cat !== '0' && subcategoria1 !== '0'){
      return this.db.list(`${USERS_LIGUE_DB}/PLAYER/${club}`,
            ref=>ref.orderByChild('subcategoria1').equalTo(`${subcategoria1}`));
    }
  }

  getClubAndCategory = (club:string): AngularFireList<Player>=>{
    return this.db.list(`CLUBS_CATEGORIES/${club}`);
  }

  save=(form:NgForm, typeUser:number)=>{
    
   
    let player: Player= new Player();
    let cat: Cat = new Cat();
    let clubMayus =  this.stServ.getCurrentSession().user.club;
    cat.id = form.controls.category.value.split("-")[0];
    cat.name = form.controls.category.value.split("-")[1];
    if( form.controls.subCategory1.value.split("-")[1] != undefined ) {
        let subCat: Cat = new Cat();
        subCat.id = form.controls.subCategory1.value.split("-")[0] != undefined ? form.controls.subCategory1.value.split("-")[0] : "";
        subCat.name = form.controls.subCategory1.value.split("-")[1]; 
        cat.subCat1 = subCat;
        player.cat = cat;
    }
        console.log("SUBCAT: ", Player);
    player.club = clubMayus;
    player.name = form.controls.name.value;
    player.lastName = form.controls.lastName.value;
    player.curp = form.controls.curp.value;
    player.position = form.controls.position.value;
    player.noPlayer = form.controls.number.value;
    player.tipo = typeUser;
    player.dateBirth = form.controls.dateBirth.value;
    player.rol = 'PLAYER';
    player.user = this.stServ.getCurrentSession().user.email;
     return this.db.list(`PLAYERS/${clubMayus}/${form.controls.category.value.split("-")[0]}`).push(Player);
  }

  
}

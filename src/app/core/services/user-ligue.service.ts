import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL, USERS_LIGUE_DB } from 'src/environments/environment';
import { ClubCategory } from '../models/Club-Category.model';
import { UserLigue } from '../models/user-ligue.model';
import { User } from '../models/user.model';
import { StorageService } from '../storage.service';
import { FileUploadService } from './file-upload.service';


@Injectable({
  providedIn: 'root'
})
export class UserLigueService {

  
  private user: User;
  constructor(private stServ: StorageService, private db: AngularFireDatabase) { 
    this.user = this.stServ.getCurrentUser();
  }

  setUserSession=()=>{
    
  }

  getByUserDelegate=()=>{
    
    const tokendt = this.stServ.getCurrentSession();
  
     return fetch(`${URL}/api/delegates/get`, {
       method: 'POST',
       body: JSON.stringify({}),
       headers: {
         "Authorization": `Bearer ${tokendt.token}`,
         "Content-Type": "application/json"
       }
     }); 
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

  getByUserLogged = (mail:string): AngularFireList<UserLigue>=>{
     return this.db.list(`${USERS_LIGUE_DB}`, ref=>ref.orderByChild('user').equalTo(`${mail}`));
  }

  getAllPlayersByUser = (email: string): AngularFireList<UserLigue[]>=>{
    return this.db.list(`${USERS_LIGUE_DB}/PLAYER/${this.stServ.getCurrentSession().user.club}`,
            ref=>ref.orderByChild('user').equalTo(`${email}`));
  }

  removeUserLiguePlayer = (idUserToRemove:string): void=>{
    this.user = this.stServ.getCurrentUser();
    this.db.list(`${USERS_LIGUE_DB}/PLAYER/${this.stServ.getCurrentSession().user.club}/${idUserToRemove}`).remove();
  }

  getUserDocumentBy = (idUserToRemove:string): void=>{
    this.user = this.stServ.getCurrentUser();
    this.db.list(`${USERS_LIGUE_DB}/PLAYER/${this.stServ.getCurrentSession().user.club}${idUserToRemove}`).remove();
  }

  getPlayersByClubAndCategory = (club:string, cat:string, subcategoria1:string):  AngularFireList<UserLigue[]>=>{
  
    if(cat !== '0' && subcategoria1 === '0'){
      return this.db.list(`${USERS_LIGUE_DB}/PLAYER/${club}`,
      ref=>ref.orderByChild('cat').equalTo(`${cat}`));
    }

    if(cat !== '0' && subcategoria1 !== '0'){
      return this.db.list(`${USERS_LIGUE_DB}/PLAYER/${club}`,
            ref=>ref.orderByChild('subcategoria1').equalTo(`${subcategoria1}`));
    }
  }

  getClubAndCategory = (club:string): AngularFireList<UserLigue>=>{
    return this.db.list(`CLUBS_CATEGORIES/${club}`);
  }

  saveUserPlayer=(form:NgForm, typeUser:number)=>{
    let userLigue: UserLigue= new UserLigue();
    let clubCategory: ClubCategory= new ClubCategory();
    let clubMayus =  this.stServ.getCurrentSession().user.club;
    userLigue.cat = form.controls.category.value;
    userLigue.subcategoria1 = form.controls.subCategory1.value != undefined ? form.controls.subCategory1.value : "";
    userLigue.subcategoria2 = form.controls.subCategory2.value != undefined ? form.controls.subCategory2.value : "";
    userLigue.subcategoria3 = form.controls.subCategory3.value != undefined ? form.controls.subCategory3.value : "";
    userLigue.club = clubMayus;
    userLigue.name = form.controls.name.value;
    userLigue.lastName = form.controls.lastName.value;
    userLigue.curp = form.controls.curp.value;
    userLigue.position = form.controls.position.value;
    userLigue.noPlayer = form.controls.number.value;
    userLigue.tipo = typeUser;
    userLigue.dateBirth = form.controls.dateBirth.value;
    userLigue.rol = 'PLAYER';
    userLigue.user = this.stServ.getCurrentSession().user.email;
    clubCategory.category = form.controls.category.value;
    clubCategory.subCategory1 = form.controls.subCategory1.value;
    this.db.list(`CLUBS_CATEGORIES/${clubMayus}/${form.controls.category.value}`).push(clubCategory);
    return this.db.list(`${USERS_LIGUE_DB}/PLAYER/${clubMayus}`).push(userLigue);
  }

  
}

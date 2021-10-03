import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL, USERS_LIGUE_DB } from 'src/environments/environment';
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

  getUserByClubAndCategory = (club:string, cat:string, subcategoria1:string):  AngularFireList<UserLigue[]>=>{
  
    if(cat !== '0' && subcategoria1 === '0'){
      return this.db.list(`${USERS_LIGUE_DB}/PLAYER/${club}`,
      ref=>ref.orderByChild('cat').equalTo(`${cat}`));
    }

    if(cat !== '0' && subcategoria1 !== '0'){
      return this.db.list(`${USERS_LIGUE_DB}/PLAYER/${club}`,
            ref=>ref.orderByChild('subcategoria1').equalTo(`${subcategoria1}`));
    }
  
    
  }
  
}

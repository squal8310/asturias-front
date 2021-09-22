import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL, USERS_LIGUE_DB } from 'src/environments/environment';
import { FormatCredentialsVO } from '../models/categories.model copy';
import { UserLigue } from '../models/user-ligue.model';
import { User } from '../models/user.model';
import { StorageService } from '../storage.service';
import { FileUploadService } from './file-upload.service';


@Injectable({
  providedIn: 'root'
})
export class UserLigueService {

  
  user: User;
  constructor(private uploadService: FileUploadService, private stServ: StorageService, private db: AngularFireDatabase) { }

  save=(tipo:number, form:NgForm)=>{
    let userLigue: UserLigue= new UserLigue();
    let formDataJs = JSON.parse( window['formRegisterDelegates']);
    this.user = this.stServ.getCurrentUser();
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
    userLigue.club =  this.user.club;
    userLigue.user = '';
    userLigue.tipo = 1;      
    userLigue.rol = 'PLAYER';

    this.db.object(`USERS_LIGUE/${this.user.club}`).set(userLigue);
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
    let formatCred: FormatCredentialsVO = new FormatCredentialsVO();
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

  getByUserLogged = (): AngularFireList<UserLigue>=>{
    this.user = this.stServ.getCurrentUser();
     return this.db.list(`${USERS_LIGUE_DB}/${this.user.club}/${this.user.id}`, ref=>ref.limitToLast(100));
  }

  getAllPlayersByclubAndUser = (): AngularFireList<UserLigue[]>=>{
    this.user = this.stServ.getCurrentUser();
     return this.db.list(`${USERS_LIGUE_DB}/${this.user.club}`, ref=>ref.child("rol").orderByChild("lastName").equalTo("PLAYER"));
  }
}

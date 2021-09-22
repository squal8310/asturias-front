import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { URL } from 'src/environments/environment';
import { Categories } from '../models/categories.model';
import { User } from '../models/user.model';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogsServiceService {
 

  public user:User;

  constructor(private stServ: StorageService, private db: AngularFireDatabase) { 
    
    this.user = this.stServ.getCurrentUser();
  }

  getMenu=(catNum: number)=>{
    let tokendtr = this.stServ.getCurrentSession();
    return fetch(URL+ "/api/menu/list", {
      method: 'POST',
      body: JSON.stringify({attr1: catNum}),
      headers: {
        "Authorization": `Bearer ${tokendtr.token}`,
        "Content-Type": "application/json"
      }
    }); 
  }

  getCategories=():AngularFireList<Categories>=>{
       return this.db.list(`CATEGORIES`, ref=>ref.limitToLast(100));
    }

  getPositions=():AngularFireList<Categories>=>{
      return this.db.list(`POSITIONS`, ref=>ref.limitToLast(100));
   }

   getCategoriesByCat=(category:string):AngularFireList<Categories>=>{
    return this.db.list("CATEGORIES", ref=>ref.child('attr1').equalTo(category));
 }

}

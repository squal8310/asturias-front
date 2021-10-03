import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { URL } from 'src/environments/environment';
import { Catalog } from '../models/catalog.model';
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

  save=(form:NgForm)=>{
    console.log("Catalogo", form);
    let catalog: Catalog = new Catalog();
    catalog.attr1 = form.controls.attr1.value;
    catalog.attr2 = form.controls.attr2.value;
    catalog.attr3 = form.controls.attr3.value;
    catalog.attr4 = form.controls.attr4.value;
    catalog.attr5 = form.controls.attr5.value;
    catalog.attr6 = form.controls.attr6.value;

    return new Promise((resolve, reject)=>{
      this.db.list(`${this.checkCatalogName(form.controls.name.value)}`).push(catalog).
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

  checkCatalogName=(catName: string)=>{
    return catName.toUpperCase();
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
       return this.db.list(`CATEGORIES`, ref=>ref.orderByChild('attr1').equalTo('10000'));
    }

  getPositions=():AngularFireList<Categories>=>{
      return this.db.list(`POSITIONS`, ref=>ref.limitToLast(100));
   }

   getCategoriesByCat=(category:string):AngularFireList<Categories>=>{
      return this.db.list("CATEGORIES", ref=>ref.orderByChild('attr1').equalTo(category));
    }

    getMenuCat=(category:string):AngularFireList<Categories>=>{
      return this.db.list("MENU", ref=>ref.orderByChild('attr1').equalTo(category));
    }

    getCatClub=():AngularFireList<Categories>=>{
      return this.db.list("CATALOG/CLUBS", ref=>ref.limitToLast(10000));
    }

}

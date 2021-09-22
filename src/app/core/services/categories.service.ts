import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Categories } from '../models/categories.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private db: AngularFireDatabase) { }


  saveCatalogs=()=>{
    let cat: Categories=new Categories();
    cat.name = "pos";
    cat.value= "Asistente"
    cat.attr1 = "80000";
    cat.attr2 = "80006";
    cat.attr3 = "0";
    cat.attr4 = "0";
    cat.attr5 = "0";
    const idPlayer = this.db.list("POSITIONS").push(cat);
        return;
  }
  
}

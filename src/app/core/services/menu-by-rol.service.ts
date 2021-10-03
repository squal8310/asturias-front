import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Categories } from '../models/categories.model';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class MenuByRolService {

  constructor(private db: AngularFireDatabase) { }

  getCategories=(menu_rol: string):AngularFireList<Categories>=>{
    return this.db.list("MENU", ref=>ref.orderByChild('attr6').equalTo(menu_rol));
 }
}

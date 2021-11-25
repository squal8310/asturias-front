import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Delegate } from '../models/delegate.model';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterDelegatesService {

 
  constructor(private stServ: StorageService, private db: AngularFireDatabase) { }

  save=( cred, delegate: Delegate)=>{
   return  this.db.object(`DELEGATES/${cred.user.uid}`).set(delegate);
  }
}

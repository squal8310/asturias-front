import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {

  userData$ = new BehaviorSubject<User>(new User());
  userSelected$ = this.userData$.asObservable();


  constructor() { }

}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Session } from './models/session.model';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private currentSession : Session = null;

  constructor(private router: Router, private stg: LocalStorageService) { 
    this.currentSession = this.loadSessionData();
  }

  
  setCurrentSession(session: Session): void {
    this.currentSession = session;
    this.stg.store('currentUser', JSON.stringify(session));
  }

  setDataStorage(nameOfData: string,stringJson: string): void {
    this.stg.store(nameOfData, JSON.stringify(stringJson));
  }

  getDataStorage(nameData:string): Object{
    var dataObj = this.stg.retrieve(nameData);
    return  JSON.parse(dataObj);
  }

  loadSessionData(): Session{
    var sessionStr = this.stg.retrieve('currentUser');
    return (sessionStr) ? <Session> JSON.parse(sessionStr) : null;
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    this.stg.clear('currentUser');
    this.currentSession = null;
  }

  getCurrentUser(): User {
    var session: Session = this.getCurrentSession();
    return (session && session.user) ? session.user : null;
  };

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  };

  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return (session && session.user.club) ? session.user.club : null;
  };

  logout(): void{
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }
}

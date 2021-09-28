import { Component, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {  Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Session } from 'src/app/core/models/session.model';
import { User } from 'src/app/core/models/user.model';
import { UserLigueService } from 'src/app/core/services/user-ligue.service';
import { StorageService } from 'src/app/core/storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoging: boolean= false;

  subscription: Subscription;
  userLigue?: any[];
  email: string;
  public loadPlayerModule: boolean = false;


  // @Input()
  // user: User;

  constructor(private storageService:StorageService, private usersLigueService: UserLigueService,
    private router: Router) { }

  ngOnInit() {
    this.callToService();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    //this.subscription.unsubscribe();
}

callToService=()=>{
  this.usersLigueService.getByUserLogged().snapshotChanges().pipe(
    map(changes =>
      // store the key
      changes.map(c => ({ key: c.payload.key, value: c.payload.val() }))
    )
    ).subscribe(values=>{
    this.userLigue=values;
    console.log("USER_DATA ",this.userLigue);
    // let sess:Session=new Session();
    // let user: User=new User();
    // console.log("----> ", this.userLigue[0]);
    // user.club = this.userLigue[0];
    // user.id = userId;
    // user.email = email;
    // sess.user = user;
    // this.storageService.setCurrentSession();
  });
}

getMenuByRole=(rol:string):void=>{
   
}

loadPlayerModuleM=()=>{
this.loadPlayerModule = true;
}

loadHome=()=>{
  this.router.navigateByUrl('/home');
  this.loadPlayerModule = false;
}

saveDataUserToSession=(club: string, userId:string, email:string)=>{
  return new Promise((resolve, reject)=>{ 
    let sess:Session=new Session();
    let user: User=new User();
    user.club = club;
    user.id = userId;
    user.email = email;
    sess.user = user;
    this.storageService.setCurrentSession(sess);
    resolve(true);
});
                 
}

}

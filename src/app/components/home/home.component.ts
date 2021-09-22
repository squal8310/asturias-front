import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router } from '@angular/router';
import {  Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Session } from 'src/app/core/models/session.model';
import { UserLigue } from 'src/app/core/models/user-ligue.model';
import { User } from 'src/app/core/models/user.model';
import { CatalogsServiceService } from 'src/app/core/services/catalogs-service.service';
import { UserLigueService } from 'src/app/core/services/user-ligue.service';
import { StorageService } from 'src/app/core/storage.service';
import { USERS_LIGUE_DB } from 'src/environments/environment';

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

  constructor(private usersLigueService: UserLigueService,
    private router: Router) { }

  ngOnInit() {
    this.usersLigueService.getByUserLogged().snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ key: c.payload.key, value: c.payload.val() }))
      )
      ).subscribe(values=>{
      this.userLigue=values;
    });

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    //this.subscription.unsubscribe();
}

loadPlayerModuleM=()=>{
this.loadPlayerModule = true;
}

loadHome=()=>{
  this.router.navigateByUrl('/home');
  this.loadPlayerModule = false;
}

}

import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AdComponent } from 'src/app/core/classes/ad-component';
import { AdDirectiveDirective } from 'src/app/core/directives/ad-directive.directive';
import { Session } from 'src/app/core/models/session.model';
import { User } from 'src/app/core/models/user.model';
import { AdComponentService } from 'src/app/core/services/ad-component.service';
import { MenuByRolService } from 'src/app/core/services/menu-by-rol.service';
import { DelegateService } from 'src/app/core/services/delegate.service';
import { StorageService } from 'src/app/core/storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoging: boolean= false;

  userLigue?: any[];
  menusByRol?: any[];
  email: string;
  public loadPlayerModule: boolean = false;
  @ViewChild(AdDirectiveDirective, {static: true}) adHost!: AdDirectiveDirective;
  private user: User;
  // @Input()
  // user: User;

  constructor(private storageService:StorageService,
              private usersLigueService: DelegateService,
              private router: Router,
              private menuServ: MenuByRolService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private adsItems: AdComponentService,
              private stServ: StorageService) {
               }

  ngOnInit() {
    this.menusByRol = [];
    this.userLigue = [];
    let user = this.storageService.getCurrentSession().user.email;
    this.callToService(user);
  }

  ngOnDestroy() {
    //this.storageService.removeCurrentSession();
}

callToService=(email:string)=>{
  this.usersLigueService.getByUserLogged(email).snapshotChanges().pipe(
    map(changes =>
      // store the key
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    )
    ).subscribe(values=>{
    this.userLigue=values;
    this.getMenuByRole(this.userLigue[0].rol);
    this.saveDataUserToSession(this.userLigue[0].club, "", this.userLigue[0].user);
  });
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

getMenuByRole=(rol:string):void=>{
  
  console.log("ROL: ", rol);
   this.menuServ.getCategories(rol).snapshotChanges().pipe(
    map(changes =>
      // store the key
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    )
    ).subscribe(values=>{
    this.menusByRol=values;
  });
}

loadPlayerModuleM=(item:number)=>{
  const adItem = this.adsItems.getComponent()[item];

  const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

  const viewContainerRef = this.adHost.viewContainerRef;
  viewContainerRef.clear();

  const componentRef = viewContainerRef.createComponent<AdComponent>(componentFactory);
  componentRef.instance.data = adItem.data;
}

loadHome=()=>{
  this.router.navigateByUrl('/home');
  this.loadPlayerModule = false;
}

logOut=()=>{
  this.menusByRol = [];
  this.userLigue = [];
  this.storageService.removeCurrentSession();
  this.router.navigateByUrl('/login');
}

}

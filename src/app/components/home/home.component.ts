import { Component, Input, OnInit } from '@angular/core';
import {  Subscription } from 'rxjs';
import { CatalogsServiceService } from 'src/app/core/services/catalogs-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoging: boolean= false;

  subscription: Subscription;
  menu: [];

  constructor(private catMenuServ: CatalogsServiceService) { }

  ngOnInit() {
    this.catMenuServ.getMenu(70000).then(res=>{
      res.text().then(rs=>{
       this.menu =  JSON.parse(rs);
      });
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    //this.subscription.unsubscribe();
}

}

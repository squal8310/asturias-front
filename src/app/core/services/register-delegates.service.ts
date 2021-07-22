import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import axios from 'axios';
import { UserLigue } from '../models/user-ligue.model';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterDelegatesService {

 
  constructor(private stServ: StorageService) { }

  gettest=()=>{
    return new EventSource("http://localhost:8080/public/delegates/register");
    //return axios.get<String>("http://localhost:8080/asturiasapp/register");
  }

  saveDelegate=(formData:{})=>{
    let userLigue: UserLigue= new UserLigue();
    let formDataJs = JSON.parse( window['formRegisterDelegates']);
    userLigue.municipio = formDataJs['category'];
    userLigue.name = formDataJs['name'];
    userLigue.lastName = formDataJs['lastName'];
    userLigue.telefono = formDataJs['telefono'];

    let tokendtr = this.stServ.getCurrentSession();
    console.log("userligue: "+userLigue);
    return axios.post("http://localhost:8080/public/delegates/register", userLigue);
  }
}

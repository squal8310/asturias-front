import { Component, EventEmitter, Input, NgZone, OnInit, Output, VERSION, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication.service';
import { LoginObject } from 'src/app/core/models/login-object.model';
import { Session } from 'src/app/core/models/session.model';
import { StorageService } from 'src/app/core/storage.service';

import { User } from 'src/app/core/models/user.model';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { RegisterDelegatesService } from 'src/app/core/services/register-delegates.service';
import { UserLigue } from 'src/app/core/models/user-ligue.model';
import { ToastMessagesService } from 'src/app/core/services/toast-messages.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoging: boolean= true;

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo;
  public loginForm: FormGroup;
  public submitted: Boolean = false;
  public error: {code: number, message: string} = null;
  @Output()
  public emit: EventEmitter<boolean> = new EventEmitter<boolean>();
  message:boolean;
  errorValid: boolean= false;
  subscription: Subscription;
  errorMessage: boolean;

  constructor(private formBuilder: FormBuilder,
              private db: AngularFireDatabase,
              private router: Router,
              private afAuth: AngularFireAuth,
              private ngxSpin: NgxSpinnerService,
              private ngZone: NgZone,
              private toastMessg: ToastMessagesService,
              private storageService: StorageService) { 
               
              }

        ngOnInit() {
          this.initForm();
        }

      initSessionIfExistUser=()=>{
          // this.afAuth.user.subscribe(user => {
          //   if (user) {
          //     this.ngZone.run(() => {
          //       this.router.navigate(['/home']);
          //     })
          //   }
          // });
      }
      
      initForm =()=>{
        this.loginForm = this.formBuilder.group({
          email: ['', Validators.required],
          password: ['', Validators.required],
          club: [""],
          repPassw: [""]
        });
      }

        signIn=()=> {
            this.ngxSpin.show();                
          if(this.loginForm.valid){
          this.afAuth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then(() => {
            this.router.navigateByUrl('/home');
            this.ngxSpin.hide();
          }).catch(({code}) => {
            this.ngxSpin.hide();
            if(code == "auth/invalid-email"){
              this.toastMessg.showFail("Formato correo electrónico erroneo, favor de corregir", "Error");
             }
            this.router.navigate(['/login']);
          });

        }
      }
            
      ngOnDestroy() {
      }

      isOkTORegister: boolean = true;
      createUser() {
        this.ngxSpin.show(); 
        // Promise.all([
         this.checkClub();
          this.checkPasswordNull();
          this.checkPasswordEquals();
          if(this.isOkTORegister){
            this.proccessRegisterUser();
          }
        // ]).then(result=>{
        //   result.map(function(promise) {
        //     return new Promise(function(resolve) {
        //       var payload = new Array(2);
        //       promise.then(function(result) {
        //           payload[0] = result;
        //         })
        //         .catch(function(error) {
        //           payload[1] = error;
        //         });
           
        // }).catch(e=>{
        //   console.log("fallo promesa: ", e);
        //   this.ngxSpin.hide();
        // });
       
      }

      checkClub= ()=>{
        // new Promise((resolve, reject) => {
          if(this.loginForm.value.club === undefined || this.loginForm.value.club === null || this.loginForm.value.club === ""){
            this.toastMessg.showFail("Favor de proporcionar club", "Error");
            this.isOkTORegister = false;
            this.ngxSpin.hide(); 
          }
        //    console.log(this.loginForm.value.club);
        //     
        //     reject("ERROR");
        //   }else{
        //     resolve("OK");
        //   }
        // });
      }

      checkPasswordNull= ()=>{
        // new Promise((resolve, reject) => {
        if((this.loginForm.value.repPassw === undefined || this.loginForm.value.repPassw === null || this.loginForm.value.repPassw === "")){
            this.toastMessg.showFail("Favor de repetir contraseña", "Error");
            this.isOkTORegister = false;
            this.ngxSpin.hide(); 
        }
      }

      checkPasswordEquals= ()=>{
        // new Promise((resolve, reject) => {
        if((this.loginForm.value.password !== this.loginForm.value.repPassw)){
            this.toastMessg.showFail("Contraseñas no coinciden", "Error");
            this.isOkTORegister = false;
            this.ngxSpin.hide(); 
          }
      }

      proccessRegisterUser=()=>{
        return new Promise((resolve, reject)=>{
          this.afAuth.createUserWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then((cred) => {
            let userLigue: UserLigue= new UserLigue();
            userLigue.club =  this.loginForm.value.club;
            userLigue.user = this.loginForm.value.email;
            userLigue.tipo = 2;      
            userLigue.rol = 'DELEGATE';

            let pathCLub = this.loginForm.value.club.toUpperCase().replace(/[\W_]/g,'_');
            
            this.db.object(`USERS_LIGUE/${pathCLub}/${cred.user.uid}`).set(userLigue).then(upd=>{
              this.saveDataUserToSession(pathCLub, cred.user.uid, this.loginForm.value.email);
              
              resolve(4);
              this.ngxSpin.hide();
              this.router.navigate(['/home']);
            });
           
           }).catch(({code}) => {
             reject(`promesa 4 fallo:  ${code}`);
             if(code == "auth/email-already-in-use"){
              this.toastMessg.showFail("Correo electrónico registrado", "Error");
             }

             if(code == "auth/invalid-email"){
              this.toastMessg.showFail("Formato correo electrónico erroneo, favor de corregir", "Error");
             }
             
             this.ngxSpin.hide();
           });
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

}

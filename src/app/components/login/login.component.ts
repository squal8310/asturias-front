import { Component, EventEmitter, Input, OnInit, Output, VERSION, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication.service';
import { LoginObject } from 'src/app/core/models/login-object.model';
import { Session } from 'src/app/core/models/session.model';
import { StorageService } from 'src/app/core/storage.service';
import Axios, { AxiosResponse } from 'axios';

import { Result } from '@zxing/library';
import { User } from 'src/app/core/models/user.model';
import { CommonServiceService } from 'src/app/core/services/common-service.service';
import { Subscription } from 'rxjs';

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

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private storageService: StorageService,
              private router: Router) { }

              ngOnInit() {
                this.loginForm = this.formBuilder.group({
                  username: ['', Validators.required],
                  password: ['', Validators.required],
                });

                
              }
            
              public submitLogin(): void {                
                if(this.loginForm.valid){
                  this.authenticationService.loginFetch(new LoginObject(this.loginForm.value))
                  .then((response) => {
                    response
                    .text()
                    .then(rs=>{

                     let jsRs = JSON.parse(rs);
                     if(jsRs.error){
                      this.errorValid = true;
                     }else{
                          this.submitted = true;
                          let sess : Session = new Session();
                          sess.token = jsRs.access_token;
                          let user : User = new User();
                          user.name = "sdfsdf";
                          sess.user = user;
                          this.isLoging = true;
                          this.storageService.setCurrentSession(sess);
                          console.log("token: ", jsRs.access_token);
                          this.router.navigate(['/home']);
                     }
                    });
                  
                  })
                  .then(result => console.log(result))
                  .catch(error => console.log('error', error));
                }
              }
            
              ngOnDestroy() {
              }

              private correctLogin(data: Session){
                this.storageService.setCurrentSession(data);
                
              }


}

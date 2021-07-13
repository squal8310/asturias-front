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
                this.submitted = true;
                this.error = null;
                let sess : Session = new Session();
                let user : User = new User();
                 
                sess.token= 'sfsfsfddsf4534543';
                user.surname = "club1";
                user.password = "pass";
                sess.user= user;
                
                this.isLoging = true;
                this.router.navigate(['/home']);
                // if(this.loginForm.valid){
                //   this.authenticationService.login(new LoginObject(this.loginForm.value)).then(
                //     (data: AxiosResponse) => {}
                //   )
                // }
              }
            
              ngOnDestroy() {
              }

              private correctLogin(data: Session){
                this.storageService.setCurrentSession(data);
                
              }


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { moment } from 'ngx-bootstrap/chronos/testing/chain';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CatalogsServiceService } from 'src/app/core/services/catalogs-service.service';
import { CommonServiceService } from 'src/app/core/services/common-service.service';
import { RegisterDelegatesService } from 'src/app/core/services/register-delegates.service';
import { ToastMessagesService } from 'src/app/core/services/toast-messages.service';

@Component({
  selector: 'app-delegate-reg',
  templateUrl: './delegate-reg.component.html',
  styleUrls: ['./delegate-reg.component.css']
})
export class DelegateRegComponent implements OnInit {

  public registerForm: FormGroup;
  public incompleteFrm: Boolean = false;
  public error: {code: number, message: string} = null;
  public catalogsJson:[] = [];
  public subCatalog1: [] = [];
  public subCatalog2: [] = [];
  public subCatalog3: [] = [];
  public positions: [] = [];
  public catClub: [] = [];

  constructor(private formBuilder: FormBuilder, 
              private catServ: CatalogsServiceService,
              private commonServ: CommonServiceService<string>,
              private router: Router, 
              private regDelegate: RegisterDelegatesService,
              private toastr: ToastMessagesService,
              private ngxSpin: NgxSpinnerService) { }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm=()=>{
    this.registerForm = this.formBuilder.group({
      club: ['', Validators.required],
      user: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      reppassword:['', Validators.required]

    });
  }

  equalPw=()=>{return this.registerForm.get("password").value === this.registerForm.get("reppassword").value};

  submitregister=()=>{
    if(this.equalPw()){
      this.toastr.showWarning("Atención", "Contraseñas no coinciden");
      return;
    }

    if(this.registerForm.valid){
      this.ngxSpin.show();
      window['formRegisterDelegates'] = JSON.stringify(this.registerForm.value);
      this.ngxSpin.show();
      // this.regDelegate.saveUser(this.registerForm.value, 2).then(result=>{
      //   console.log("-------> ",result);
            // if(datjs.responseOK){
            //   this.registerForm.reset();
            //   this.showSuccess("Informe", "Se guardo su información correctamente");
            //   this.ngxSpin.hide();
            //   this.router.navigate(["/login"]);            
            // }

            // if(datjs.mensaje === "USER_REPEATED"){
            //   this.showWarning("Atención", "Favor de usar otro usario");
            // }
        
      // });
    }else{
      this.incompleteFrm = true;
    }
  }
}

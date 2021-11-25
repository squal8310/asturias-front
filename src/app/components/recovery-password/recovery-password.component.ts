import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RegisterDelegatesService } from 'src/app/core/services/register-delegates.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent implements OnInit {
  
  public recoveryForm: FormGroup;
  public incompleteFrm: Boolean = false;

  constructor(private formBuilder: FormBuilder, 
              private router: Router, 
              private regDelegate: RegisterDelegatesService,
              private toastr: ToastrService,
              private ngxSpin: NgxSpinnerService) { }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm=()=>{
    this.recoveryForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      reppassword: ['', Validators.required]
    });
  }

  submitrecovery=(form)=>{
    if(this.recoveryForm.valid){
      this.ngxSpin.show();
      window['formrecoveryDelegates'] = JSON.stringify(this.recoveryForm.value);
      
    }else{
      this.incompleteFrm = true;
    }
  }

  showSuccess(head:string, dataInfo:string) {
    this.toastr.success(head, dataInfo);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { moment } from 'ngx-bootstrap/chronos/testing/chain';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CatalogsServiceService } from 'src/app/core/services/catalogs-service.service';
import { CommonServiceService } from 'src/app/core/services/common-service.service';
import { RegisterDelegatesService } from 'src/app/core/services/register-delegates.service';

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
              private toastr: ToastrService,
              private ngxSpin: NgxSpinnerService) { }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {

    this.initForm();
    this.initCategories(10000);
    this.initClubs(20000);
  }

  initClubs=(catNum: number)=>{
    this.catServ.getCategories(catNum).then((cat)=>{
      cat
      .text()
      .then((txtResp)=>{
        this.catClub = JSON.parse(txtResp);
      });
    });
  }
  
  initCategories=(catNum: number)=>{
    this.catServ.getCategories(catNum).then((cat)=>{
      cat
      .text()
      .then((txtResp)=>{
        this.catalogsJson = JSON.parse(txtResp);
      });
    });
  }

  changeCategoriesiF=(catNum: number, whatCatalog)=>{
    
    console.log("cate: "+whatCatalog);
    this.catServ.getCategories(catNum).then(cat=>{
      cat
      .text()
      .then((txtResp)=>{
        let result = JSON.parse(txtResp);
        switch(whatCatalog){
          case 1:
            if(result.length > 0){
              this.subCatalog1 = result;
            }else{
              this.subCatalog1 = [];
            }
          break;
          case 2:
            if(result.length > 0){
              this.subCatalog2 = result;
            }else{
              this.subCatalog2 = [];
            }
          break;
          case 3:
            if(result.length > 0){
              this.subCatalog3 = result;
            }else{
              this.subCatalog3 = [];
            }
          break;
        }
      });
    });
  }

  initForm=()=>{
    this.registerForm = this.formBuilder.group({
      category: ['', Validators.required],
      subCategory1: [''],
      subCategory2: [''],
      subCategory3: [''],
      club: [Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required]

    });
  }

  submitregister=()=>{
    if(this.registerForm.valid){
      this.ngxSpin.show();
      window['formRegisterDelegates'] = JSON.stringify(this.registerForm.value);
      this.regDelegate.savePlayers(2).then(result=>{
        result.text().then(data=>{
          let datjs = JSON.parse(data);
            if(datjs.id){
              this.registerForm.reset();
              this.showSuccess("Info", "Se guardo su información correctamente");
              this.ngxSpin.hide();
            }
        });
      });
    }else{
      this.incompleteFrm = true;
    }
  }

  showSuccess(head:string, dataInfo:string) {
    this.toastr.success(head, dataInfo);
  }

}

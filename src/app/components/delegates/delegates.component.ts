import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogsServiceService } from 'src/app/core/services/catalogs-service.service';
import { CommonServiceService } from 'src/app/core/services/common-service.service';

@Component({
  selector: 'app-delegates',
  templateUrl: './delegates.component.html',
  styleUrls: ['./delegates.component.css']
})
export class DelegatesComponent implements OnInit {

  public registerForm: FormGroup;
  public incompleteFrm: Boolean = false;
  public error: {code: number, message: string} = null;
  public catalogsJson:[] = [];
  public subCatalog1: [] = [];
  public subCatalog2: [] = [];
  public subCatalog3: [] = [];
  public positions: [] = [];

  constructor(private formBuilder: FormBuilder, 
              private catServ: CatalogsServiceService,
              private commonServ: CommonServiceService<string>,
              private router: Router) { }

  ngOnInit(): void {

    this.initForm();
    this.initCategories(10000);
    this.initPositions(80000);
  }

  initPositions=(catNum: number)=>{
    this.catServ.getCategories(catNum).then((cat)=>{
      cat
      .text()
      .then((txtResp)=>{
        this.positions = JSON.parse(txtResp);
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
            }
          break;
          case 2:
            if(result.length > 0){
              this.subCatalog2 = result;
            }
          break;
          case 3:
            if(result.length > 0){
              this.subCatalog3 = result;
            }
          break;
        }
      });
    });
  }

  initForm=()=>{
    this.registerForm = this.formBuilder.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      curp: ['', Validators.required], 
      position: ['', Validators.required],
      number: ['', Validators.required]

    });
  }

  submitregister=()=>{
    console.log("eeerror frm");
    if(this.registerForm.valid){
      window['formRegisterDelegates'] = JSON.stringify(this.registerForm.value);
      this.commonServ.emit(JSON.stringify(this.registerForm.value));
      this.router.navigate(['/documents']);
      
    }else{
      this.incompleteFrm = true;
    }
  }
}

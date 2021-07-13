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
  public submitted: Boolean = false;
  public error: {code: number, message: string} = null;
  public catalogsJson:[] = [];
  public subCatalog1: [] = [];
  public subCatalog2: [] = [];
  public subCatalog3: [] = [];

  constructor(private formBuilder: FormBuilder, 
              private catServ: CatalogsServiceService,
              private commonServ: CommonServiceService<string>,
              private router: Router) { }

  ngOnInit(): void {

    this.initForm();
    this.initCategories(10000);
  }

  initCategories=(catNum: number)=>{
    this.catServ.getCategories(catNum).then(cat=>{
      this.catalogsJson = cat.data;
    });
  }

  changeCategoriesiF=(catNum: number, whatCatalog)=>{
    
    console.log("cate: "+whatCatalog);
    this.catServ.getCategories(catNum).then(cat=>{
      console.log("cate: "+whatCatalog);
      switch(whatCatalog){
        case 1:
          if(cat.data.length > 0){
            this.subCatalog1 = cat.data;
          }
        break;
        case 2:
          if(cat.data.length > 0){
            this.subCatalog2 = cat.data;
          }
        break;
        case 3:
          if(cat.data.length > 0){
            this.subCatalog3 = cat.data;
          }
        break;
      }
    });
  }

  initForm=()=>{
    this.registerForm = this.formBuilder.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  submitregister=(formDat?: NgForm)=>{
    window['formRegisterDelegates'] = JSON.stringify(this.registerForm.value);
    this.commonServ.emit(JSON.stringify(this.registerForm.value));
    this.router.navigate(['/documents']);
  }
}

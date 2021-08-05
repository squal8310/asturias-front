import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogsServiceService } from 'src/app/core/services/catalogs-service.service';
import { CommonServiceService } from 'src/app/core/services/common-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-delegates',
  templateUrl: './delegates.component.html',
  styleUrls: ['./delegates.component.css']
})
export class DelegatesComponent implements OnInit, AfterViewInit {

  myDateValue= moment().format("MM-DD-YYYY");
  minDate: Date;//moment().subtract(1, 'year').format("MM-DD-YYYY");
  maxDate: Date;//= moment().format("MM-DD-YYYY");
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
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {

    this.initForm();
    this.initCategories(10000);
    this.initPositions(80000);
  }

  ngAfter

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
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      curp: ['', Validators.required], 
      position: ['', Validators.required],
      number: ['', Validators.required],
      dateBirth: ['', Validators.required]

    });
  }

  submitregister=()=>{
    if(this.registerForm.valid){
      window['formRegisterDelegates'] = JSON.stringify(this.registerForm.value);
      this.commonServ.emit(JSON.stringify(this.registerForm.value));
      this.router.navigate(['/documents']);
      
    }else{
      this.incompleteFrm = true;
    }
  }
}

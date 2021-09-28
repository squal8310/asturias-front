import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogsServiceService } from 'src/app/core/services/catalogs-service.service';
import { CommonServiceService } from 'src/app/core/services/common-service.service';
import * as moment from 'moment';
import { RegisterDelegatesService } from 'src/app/core/services/register-delegates.service';
import { Categories } from 'src/app/core/models/categories.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { map } from 'rxjs/operators';
import { ToastMessagesService } from 'src/app/core/services/toast-messages.service';

@Component({
  selector: 'app-players-reg',
  templateUrl: './players-reg.component.html',
  styleUrls: ['./players-reg.component.css']
})
export class PlayersRegComponent implements OnInit, AfterViewInit {

  minDate: "2021-08-14";// moment().subtract(70, "year").format("DD-MM-YYYY");
  maxDate: "1990-08-14";//moment().subtract(5, "year").format("DD-MM-YYYY");
  public registerForm: FormGroup;
  public incompleteFrm: Boolean = false;
  public error: {code: number, message: string} = null;
  public catalogsJson?: any[];
  public subCatalog1?: any[];
  public subCatalog2?: any[];
  public subCatalog3?: any[];
  public positions?: any[];
  public subCat1Val:string = "0";
  @ViewChild('fcCatego') fcCatego: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private delegatesServ: RegisterDelegatesService,
              private ngxSpin: NgxSpinnerService,
              private catServ: CatalogsServiceService,
              private toastr: ToastMessagesService) { 
                // this.cat.saveCatalogs();
              }
  ngAfterViewInit(): void {
    
  }
 
  ngOnInit(): void {

    
    this.initForm();
    this.initCategories();
    this.initPositions();
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

  initCategories=()=>{
    this.catServ.getCategories().snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
      )
      ).subscribe(values=>{
      this.catalogsJson=values;
    });
  }
  
  initPositions=()=>{
    this.catServ.getPositions().snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
      ).subscribe(values=>{
      this.positions=values;
    });
  }

  changeCategoriesiF=(category:string, whatCatalog:number)=>{
    this.ngxSpin.show();  
    
    this.catServ.getCategoriesByCat(category).snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
      )
      ).subscribe(values=>{
      switch(whatCatalog){
        case 1:
          if(values.length > 0){
            this.subCatalog1 = values;
            
          }else{
            this.subCatalog1 = [];
          }
        break;
        case 2:
            this.subCat1Val = category;
          if(values.length > 0){
            this.subCatalog2 = values;
          }else{
            this.subCatalog2 = [];
          }
        break;
        case 3:
          if(values.length > 0){
            this.subCatalog3 = values;
          }else{
            this.subCatalog3 = [];
          }
        break;
      }
      this.ngxSpin.hide();    
    });
  }



  submitregister=(registerFormp)=>{
    let failSubcat1 = false;
    console.log("registro");
    if(this.isNotSelectedSubCat()){
      this.toastr.showFail("Favor de seleccionar una subcategoría", "Error subcategoría");
      failSubcat1 = true;
    }

    if(this.registerForm.valid && !failSubcat1){
      this.ngxSpin.show();
      this.delegatesServ.saveUser(registerFormp, 1);
      this.toastr.showSuccess("Registro guardado correctamente", "Info");
    }else{
      this.incompleteFrm = true;
    }
  }

  isEmptySubCat=()=>{return this.subCatalog1 == undefined ||  this.subCatalog1 == null ||  this.subCatalog1.length == 0}

  isNotSelectedSubCat=()=>{return this.subCatalog1.length > 0 && this.subCat1Val == "0"}

}


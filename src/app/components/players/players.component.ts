import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserLigueService } from 'src/app/core/services/user-ligue.service';

import { DomSanitizer } from '@angular/platform-browser';
import { RegisterDelegatesService } from 'src/app/core/services/register-delegates.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserLigue } from 'src/app/core/models/user-ligue.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastMessagesService } from 'src/app/core/services/toast-messages.service';
import { CatalogsServiceService } from 'src/app/core/services/catalogs-service.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  fileUrl;
  public filtersForm: FormGroup;
  pdfSrc: any; format:string;
  public catClub: [] = [];
  public headElements: []= [];
  public clubSelected: Boolean = true;
  public idPlayerToSend:string = "";
  @ViewChild('ifrmPdf', {static: false}) iframe: ElementRef;

  valClub: string;
  pdf : string;
  allPlayers?: any;
  dtTrigger: Subject<any> = new Subject();
  public catalogsJson?: any[];
  public subCatalog1?: any[];
  public subCatalog2?: any[];
  public subCatalog3?: any[];
  public subCat1Val:string = "0";

  constructor(private formBuilder: FormBuilder,
              private userLigueService:UserLigueService,
              private toastr: ToastMessagesService,
              private ngxSpin: NgxSpinnerService,
              private catServ: CatalogsServiceService) { }


  ngOnInit(): void {
    this.initPlayers();
    this.initForm();
    this.initCategories();
  }

  initForm=()=>{
    this.filtersForm = this.formBuilder.group({
      category: [''],
      subCategory1: [''],
      subCategory2: [''],
      subCategory3: ['']

    });
  }

  isEmptySubCat=()=>{return this.subCatalog1 == undefined ||  this.subCatalog1 == null ||  this.subCatalog1.length == 0}

  initPlayers=()=>{
    this.ngxSpin.show();
    this.userLigueService.getAllPlayersByUser().snapshotChanges().
    pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
      )
      ).
      subscribe(values=>{
      this.allPlayers=values;     
      this.ngxSpin.hide();
    });
  }

  removeUserLiguePlayer=(userIdToRemove:string):void=>{
    this.userLigueService.removeUserLiguePlayer(userIdToRemove);
  }

  sendToModalIdClient=(idClient:string)=>{
    console.log("el idcliente: ",idClient)
    window['idClientGlobal']= idClient;
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

  
  filterByCategory=()=>{}
}

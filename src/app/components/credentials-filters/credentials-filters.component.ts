import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { CatalogsServiceService } from 'src/app/core/services/catalogs-service.service';
import { ToastMessagesService } from 'src/app/core/services/toast-messages.service';
import { PlayerService } from 'src/app/core/services/player.service';
import { StorageService } from 'src/app/core/storage.service';

@Component({
  selector: 'app-credentials-filters',
  templateUrl: './credentials-filters.component.html',
  styleUrls: ['./credentials-filters.component.css']
})
export class CredentialsFiltersComponent implements OnInit {

  public catalogsJson?: any[];
  public subCatalog1?: any[];
  public subCatalog2?: any[];
  public subCatalog3?: any[];
  public clubs?: any[];
  public catVal: string = "0";
  public subCat1Val: string = "0";
  public clubVal: string = "0";
  public filtersForm: FormGroup;
  @Output()
  public credentials?: any[];


  constructor(private formBuilder: FormBuilder,
    private userLigueService: PlayerService,
    private toastr: ToastMessagesService,
    private ngxSpin: NgxSpinnerService,
    private catServ: CatalogsServiceService,
    private stServ: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.initForm();
    this.initCategories();
    this.initClubs();
  }

  initForm = () => {
    this.filtersForm = this.formBuilder.group({
      category: [''],
      subCategory1: [''],
      subCategory2: [''],
      subCategory3: [''],
      club: ['']

    });
  }

  initCategories = () => {
    this.catServ.getCategories().snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(values => {
      this.catalogsJson = values;
    });
  }

  initClubs = () => {
    this.catServ.getCatClub().snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(values => {
      this.clubs = values;
    });
  }

  onChangeCat = (val: string) => {
    this.catVal = val;
  }

  onChangeSubCat1 = (val: string) => {
    this.subCat1Val = val;
  }

  onChangeClub = (val: string) => {
    this.clubVal = val;
  }

  filterData = () => {
    this.ngxSpin.show();
    this.userLigueService.getPlayersByClubAndCategory(this.clubVal, this.catVal, this.subCat1Val).snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(values => {
      this.credentials = values;
      this.stServ.setDataStorage("credentialsData", JSON.stringify(this.credentials));
      setTimeout(()=>{
        this.ngxSpin.hide();
        this.router.navigate(['/credentials-print']);
      }, 1500);
    });
  }

  changeCategoriesiF = (category: string, whatCatalog: number) => {
    this.ngxSpin.show();

    this.catServ.getCategoriesByCat(category).snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(values => {
      switch (whatCatalog) {
        case 1:
          if (values.length > 0) {
            this.subCatalog1 = values;

          } else {
            this.subCatalog1 = [];
          }
          break;
        case 2:
          this.subCat1Val = category;
          if (values.length > 0) {
            this.subCatalog2 = values;
          } else {
            this.subCatalog2 = [];
          }
          break;
        case 3:
          if (values.length > 0) {
            this.subCatalog3 = values;
          } else {
            this.subCatalog3 = [];
          }
          break;
      }
      this.ngxSpin.hide();
    });
  }

  isEmptySubCat = () => { return this.subCatalog1 == undefined || this.subCatalog1 == null || this.subCatalog1.length == 0 }

  filterByCategory = () => { }

}

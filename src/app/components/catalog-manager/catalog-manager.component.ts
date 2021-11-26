import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CatalogsService } from 'src/app/core/services/catalogs-service.service';
import { ToastMessagesService } from 'src/app/core/services/toast-messages.service';

@Component({
  selector: 'app-catalog-manager',
  templateUrl: './catalog-manager.component.html',
  styleUrls: ['./catalog-manager.component.css']
})
export class CatalogManagerComponent implements OnInit {

  public registerCatalog: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private toastr: ToastMessagesService,
              private ngxSpin: NgxSpinnerService,
              private catalogService: CatalogsService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm=()=>{
    this.registerCatalog = this.formBuilder.group({
      name: ['', Validators.required],
      attr1: ['', Validators.required],
      attr2: [''],
      attr3: [''],
      attr4: [''],
      attr5: [''],
      attr6: ['']
    });
  }

  submitregister=(registerCatalogp)=>{
    let failSubcat1 = false;
    // if(this.isNotSelectedSubCat()){
    //   this.toastr.showFail("Favor de seleccionar una subcategoría", "Error subcategoría");
    //   failSubcat1 = true;
    // }

    if(this.registerCatalog.valid && !failSubcat1){
      this.ngxSpin.show();
      this.catalogService.save(registerCatalogp);
      this.toastr.showSuccess("Registro guardado correctamente", "Info");
      this.ngxSpin.hide();
    }
  }

  // isNotSelectedSubCat=()=>{return this.subCatalog1.length > 0 && this.subCat1Val == "0"}


}

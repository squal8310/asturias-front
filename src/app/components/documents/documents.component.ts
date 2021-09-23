import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/core/services/common-service.service';
import { RegisterDelegatesService } from 'src/app/core/services/register-delegates.service';
import { UploadFileServiceService } from 'src/app/core/services/upload-file-service.service';

declare var appFire;

export class FileSend{
  id: number;
  file: File;
}
interface FileValid{
  id: number;
  fileType: String;
}

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  selectedFiles: FileList;
  filesArray: FileList[]=[];
  currentFile: File;
  filesValid: FileValid[] = [{id:1, fileType: 'Fotografía'}, {id:2, fileType:'Acta de nacimiento'}, {id:3, fileType:'Carta responsiva'}, {id:4, fileType:'CURP'}, {id:5, fileType:'Credencial escolar'}, {id:6, fileType:'INE'}, {id:7, fileType:'Certificado médico'}, {id:8, fileType:'Formato federación'}];
  progress = 0;
  message = '';
  public frmValid: any;
  public frmValid2: any;
  public  frmInValid: boolean = false;
  formData: FormData = new FormData();
  dataSaved: boolean = false;
  public storageFire;
  public storageFirePut;
  public fileStorageFire;
  constructor(private commonServ: CommonServiceService<string>, 
              private regDelegate: RegisterDelegatesService,
              private uploadService: UploadFileServiceService,
              private router: Router,
              private toastr: ToastrService,
              private ngxSpin: NgxSpinnerService) { 
    
  }

  ngOnInit() {
  }
}

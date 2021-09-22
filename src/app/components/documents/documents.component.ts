import { Component, OnInit } from '@angular/core';
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
    
    const _this = this;
    let emiter = '';
    this.commonServ.getemited().subscribe((emit)=>{
      emiter = emit;
      _this.frmValid2 = emiter;
    });
    this.setvalidForm();

      this.storageFire = appFire.storage().ref();
   }

   setvalidForm=()=>{
    this.frmValid =JSON.parse( window['formRegisterDelegates']);
   }

  selectFile(event, fileNum:number) {
    let obFile: FileSend = new FileSend();
    
    obFile.id= fileNum;
    this.selectedFiles = event.target.files[0];
    var reader = new FileReader();
    console.log("Files ----> ", event.target.files[0])
    this.fileStorageFire = event.target.files[0];
    this.storageFirePut = this.storageFire.child(this.fileStorageFire.name);
    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        let binaryData = e.target.result;
        //Converting Binary Data to base 64
        let base64String = window.btoa(binaryData);

        const compressed = this.lz.compress(base64String);
        
        //showing file converted to base64
        console.log('1 ---> ', base64String);
        console.log('2 ---> ', compressed);
      };
    })( this.selectedFiles);
    this.formData.append("file", this.selectedFiles[0]);
  }

  validFormEvent=()=>{

  }

  upload=()=> {
    this.storageFirePut.put(this.fileStorageFire).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
  });
    // this.progress = 0;
    // let noEmptyFile = '';
    // let countFile = 0;
    // this.formData.forEach(function(file){
    //   countFile++;
    // });
    //   // if(countFile == 0 || countFile < 8){
    //   //   this.frmInValid = true;
    //   //   this.message = "Faltan archivos por agregar";
    //   //   this.dataSaved = false;
    //   // }else{
    //     this.frmInValid = false;
    //     this.regDelegate.saveUser(1)
    //     .then(
    //       response => {
    //         response.text().then(responseText=>{
    //           let obj = JSON.parse(responseText);
    //           this.uploadService.upload(this.formData, obj.club, obj.id);
    //           this.dataSaved = true;
    //           this.router.navigate(['/players']);
    //           this.showSuccess("Info", "Se guardo su información correctamente");
    //         });
    //       },
    //       err => {
    //         console.log("Registro no exitoso: ", err);
    //       });
    //   }  
  }

  showSuccess(head:string, dataInfo:string) {
    this.toastr.success(head, dataInfo);
  }
}

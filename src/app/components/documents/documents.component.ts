import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserLigue } from 'src/app/core/models/user-ligue.model';
import { CommonServiceService } from 'src/app/core/services/common-service.service';
import { RegisterDelegatesService } from 'src/app/core/services/register-delegates.service';
import { UploadFileServiceService } from 'src/app/core/services/upload-file-service.service';

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

  constructor(private commonServ: CommonServiceService<string>, 
              private regDelegate: RegisterDelegatesService,
              private uploadService: UploadFileServiceService) { 
    
  }

  ngOnInit() {
    
    const _this = this;
    let emiter = '';
    this.commonServ.getemited().subscribe((emit)=>{
      emiter = emit;
      _this.frmValid2 = emiter;
      console.log("var ", _this.frmValid2);
    });
    console.log("Emitio frm: ",_this.frmValid2);
    this.setvalidForm();
   }

   setvalidForm=()=>{
    this.frmValid =JSON.parse( window['formRegisterDelegates']);
   }

  selectFile(event, fileNum:number) {
    let obFile: FileSend = new FileSend();
    
    obFile.id= fileNum;
    this.selectedFiles = event.target.files;
    this.formData.append("file", this.selectedFiles[0]);
    // this.filesArray.push(event.target.files);
    // this.selectedFiles = event.target.files;
    // switch(file){
    //   case 1:

    //   break;
    //   case 2:
    //   break;
    //   case 3:
    //   break;
    //   case 4:
    //   break;
    //   case 5:
    //   break;
    //   case 6:
    //   break;
    //   case 7:
    //   break;
    //   case 8:
    //   break;
    // }
  }

  validFormEvent=()=>{

  }

  upload=()=> {
    this.progress = 0;
  
    let noEmptyFile = '';
    console.log("files st");
   
      // if(this.filesArray.length == 0 || this.filesArray.length < 8){

      //   this.frmInValid = true;
      //   this.message = "Faltan archivos por agregar";
      // }else{
        
         this.uploadService.upload(this.formData);
      // }


    //this.regDelegate.saveDelegate(this.frmValid);
    // .subscribe(
    //   event => {
    //     if (event.type === HttpEventType.UploadProgress) {
    //       this.progress = Math.round(100 * event.loaded / event.total);
    //     } else if (event instanceof HttpResponse) {
    //       this.message = event.body.message;
    //       this.fileInfos = this.uploadService.getFiles();
    //     }
    //   },
    //   err => {
    //     this.progress = 0;
    //     this.message = 'Could not upload the file!';
    //     this.currentFile = undefined;
    //   });
  
  }
}

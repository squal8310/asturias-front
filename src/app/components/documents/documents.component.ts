import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserLigue } from 'src/app/core/models/user-ligue.model';
import { CommonServiceService } from 'src/app/core/services/common-service.service';
import { RegisterDelegatesService } from 'src/app/core/services/register-delegates.service';
import { UploadFileServiceService } from 'src/app/core/services/upload-file-service.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  public frmValid: any;
  public frmValid2: any;

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

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  validFormEvent=()=>{

  }

  upload=()=> {
    this.progress = 0;
  
    this.uploadService.upload(this.selectedFiles);

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
  
    this.selectedFiles = undefined;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUpload } from 'src/app/core/models/file-upload.model';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { StorageService } from 'src/app/core/storage.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

  public uploadForm: FormGroup;
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  public buttonDisabled: [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean];
  public documentToUploadTitle: Array<any>;

  constructor(private formBuilder: FormBuilder,
              private uploadService: FileUploadService,
              private storageService: StorageService) {
                this.documentToUploadTitle = new Array({id:1, name:"Fotografía"}, {id:2, name:"Acta de nacimiento"}, {id:3, name:"Carta responsiva"}, {id:4, name:"CURP"}, {id:5, name:"Credencial escolar"}, {id:6, name:"INE (Papá o Mamá)"}, {id:7, name:"Certificado médico"}, {id:8, name:"Formato federación"});
                console.log("Docs ", this.documentToUploadTitle);
              }

  ngOnInit(): void {
    this.buttonDisabled=[true,true,true,true,true,true,true,true];
    this.initForm();
  }

  initForm=()=>{
    this.uploadForm = this.formBuilder.group({
      fileUpload: ['', Validators.required]

    });
  }


  selectFile(event: any, numButton: number): void {
    this.selectedFiles = event.target.files;
    this.percentage = 0;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
            if(this.percentage === 100){
              this.uploadForm.reset();
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    }

  }

}

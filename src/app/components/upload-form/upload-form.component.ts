import { Component, Input, OnInit } from '@angular/core';
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
  @Input()
  public idPlayer:string;


  constructor(private formBuilder: FormBuilder,
              private uploadService: FileUploadService,
              private storageService: StorageService) {
              }

  ngOnInit(): void {
    this.initForm();
  }

  initForm=()=>{
    this.uploadForm = this.formBuilder.group({
      fileUpload: ['', Validators.required]

    });

    this.uploadForm.reset();
  }


  selectFile(event: any): void {
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

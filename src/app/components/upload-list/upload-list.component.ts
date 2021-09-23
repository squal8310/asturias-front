import { Component, Input, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { map } from 'rxjs/operators';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css']
})
export class UploadListComponent implements OnInit {
  fileUploads?: any[]=[];
  @Input()
  public idPlayer:string;
  user: User;

  public interval: any;
  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.getFilesListEvery();
    }, 2000);
  }

  getFilesListEvery=()=>{
    const idCl = window['idClientGlobal'] || "";
    if(idCl){
      this.uploadService.getFiles(6).snapshotChanges().pipe(
        map(changes =>
          // store the key
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      ).subscribe(fileUploads => {
        console.log("Files of: ", fileUploads);
        this.fileUploads = fileUploads;
      });
      }
  }
}

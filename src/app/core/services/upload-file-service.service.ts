import { Injectable } from '@angular/core';
import axios from 'axios';
import { URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileServiceService {

  
  constructor() { }

  upload(selectedFiles: FileList) {
    let formData: FormData = new FormData();

    //let config: AxioxRequestConfig

    for (var i = 0; i < selectedFiles.length; i++) {
      console.log(selectedFiles[i]);
      
      formData.append('file', selectedFiles[i]);
    }

    console.log("files: "+formData);
    return fetch(`${URL}/public/documents/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
      }
    });     
  }

  getFiles() {
    return "";
  }
}

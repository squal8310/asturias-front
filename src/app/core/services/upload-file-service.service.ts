import { Injectable } from '@angular/core';
import axios from 'axios';
import { FileSend } from 'src/app/components/documents/documents.component';
import { URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileServiceService {

  
  constructor() { }

  upload(selectedFiles: FormData) {
    
    return fetch(`${URL}/public/documents/upload`, {
      method: 'POST',
      body: selectedFiles,
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
      }
    });     
  }

  getFiles() {
    return "";
  }
}

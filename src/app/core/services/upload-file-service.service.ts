import { Injectable } from '@angular/core';
import axios from 'axios';
import { FileSend } from 'src/app/components/documents/documents.component';
import { URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileServiceService {

  
  constructor() { }

  upload(selectedFiles: FormData, club: string, id:string) {
    
    return fetch(`${URL}/public/documents/upload/${club}/${id}`, {
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

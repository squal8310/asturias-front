import { Injectable } from '@angular/core';
import { FileSend } from 'src/app/components/documents/documents.component';
import { URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileServiceService {

  
  constructor() { }

  upload(selectedFiles: FormData, club: string, id:string) {
    
    return fetch(`${URL}/api/documents/upload/${club}/${id}`, {
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

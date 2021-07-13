import { Injectable } from '@angular/core';
import axios from 'axios';

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
    // return axios.post("http://localhost:8080/documents/save", formData, {
    //   headers: {
    //       'Content-Type': 'multipart/form-data'
    //   },
    // });

    return axios({
      // Endpoint to send files
      url: "http://localhost:8080/documents/save",
      method: "POST",
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      // Attaching the form data
      data: formData,
    });
    
  }

  getFiles() {
    return "";
  }
}

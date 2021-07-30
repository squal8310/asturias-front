import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserLigueService } from 'src/app/core/services/user-ligue.service';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  allPlayers: [];
  headElements: string[] = ["Nombre", "CURP", "Categoría", "Acciones"];
  constructor(private userLigue:UserLigueService,
    private sanitizer: DomSanitizer) { }

  @ViewChild('ifrmPdf', {static: false}) iframe: ElementRef;

  pdf : string;
  ngOnInit(): void {
    
    this.userLigue.get(1).then(rs=>{
      rs.text().then(rsTxt=>{
        this.allPlayers = JSON.parse(rsTxt);
      });
    });

    // this.downloadCredentialsFn(1);
  }

  fileUrl;
  pdfSrc: any;
  getCredentialsFn(type: number, downloadFile: Boolean){
    this.userLigue.getCredentials(type, false).then(rs=>{
      rs.blob().then(rspdf=>{
        rspdf.arrayBuffer().then(arr=>{

          let blob = new Blob([arr], {type: 'application/pdf'});
          const reader = new FileReader();
          reader.onloadend = () => {
            let base64data = reader.result;        
          }

          reader.readAsDataURL(blob); 
          this.pdfSrc = arr;
        });
      });     

    });

    if(downloadFile){
      this.downloadCredentialsFn(1);
    }
  }

  downloadCredentialsFn(type: number){
    this.userLigue.getCredentials(type, true).then(rs=>{
      rs.blob().then(rspdf=>{
        rspdf.arrayBuffer().then(arr=>{

          let blob = new Blob([arr], {type: 'application/octet-stream'});         
          this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
        });
          // Create an iframe to demonstrate it:
      });     

    });
  }

}

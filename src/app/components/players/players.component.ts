import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserLigueService } from 'src/app/core/services/user-ligue.service';

import { DomSanitizer } from '@angular/platform-browser';
import { RegisterDelegatesService } from 'src/app/core/services/register-delegates.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  allPlayers: [];
  fileUrl;
  pdfSrc: any;
  catFormats: Array<any>=[{id:"F1", value:"Formato 1"}, {id:"F2", value:"Formato 2"}, {id:"F3", value:"Formato 3"}];
  format:string;
  public catClub: [] = [];
  public clubSelected: Boolean = true;
  headElements: string[] = ["Nombre", "Apellidos", "CURP", "Club",  "Acciones"];
  constructor(private userLigue:UserLigueService,
              private delegatesServ: RegisterDelegatesService,
              private sanitizer: DomSanitizer,
              private toastr: ToastrService,
              private ngxSpin: NgxSpinnerService) { }

  @ViewChild('ifrmPdf', {static: false}) iframe: ElementRef;

  valClub: string;
  pdf : string;
  ngOnInit(): void {
    
    this.initClubs(20000);
    // this.downloadCredentialsFn(1);
  }

  changeClubsVal=(valueCombo:string)=>{
    this.valClub = valueCombo;
    this.ngxSpin.show();
    this.userLigue.get(this.valClub).then(rs=>{
      rs.text().then(rsTxt=>{
        this.allPlayers = JSON.parse(rsTxt);
        this.ngxSpin.hide();
      });
    });

    if(valueCombo !== '0'){
      this.clubSelected = false;
    }else{
      this.clubSelected = true;
    }
  }

  initClubs=(catNum: number)=>{
    this.delegatesServ.getAllClubs().then((cat)=>{
      cat
      .text()
      .then((txtResp)=>{
        this.catClub = JSON.parse(txtResp);
      });
    });
  }

  getCredentialsFn(frente: boolean, downloadFile: boolean){
    this.ngxSpin.show();
    this.userLigue.getCredentials(this.valClub, frente, false).then(rs=>{
      rs.blob().then(rspdf=>{
        rspdf.arrayBuffer().then(arr=>{

          let blob = new Blob([arr], {type: 'application/pdf'});
          const reader = new FileReader();
          reader.onloadend = () => {
            let base64data = reader.result;        
          }

          reader.readAsDataURL(blob); 
          this.pdfSrc = arr;
          this.ngxSpin.hide();
        });
      });     

    });

    if(downloadFile){
      this.downloadCredentialsFn(frente);
    }
  }
  
  downloadCredentialsFn(frente: boolean){
    this.ngxSpin.show();
    this.userLigue.getCredentials(this.valClub, frente, true).then(rs=>{
      rs.blob().then(rspdf=>{
        rspdf.arrayBuffer().then(arr=>{

          let blob = new Blob([arr], {type: 'application/octet-stream'});         
          this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
          this.ngxSpin.hide();
        });
          // Create an iframe to demonstrate it:
      });     

    });
  }

  showSuccess(head:string, dataInfo:string) {
    this.toastr.success(head, dataInfo);
  }

}
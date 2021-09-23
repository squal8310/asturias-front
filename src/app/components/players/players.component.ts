import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserLigueService } from 'src/app/core/services/user-ligue.service';

import { DomSanitizer } from '@angular/platform-browser';
import { RegisterDelegatesService } from 'src/app/core/services/register-delegates.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserLigue } from 'src/app/core/models/user-ligue.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastMessagesService } from 'src/app/core/services/toast-messages.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  fileUrl;
  pdfSrc: any; format:string;
  public catClub: [] = [];
  public clubSelected: Boolean = true;
  public idPlayerToSend:string = "";
  @ViewChild('ifrmPdf', {static: false}) iframe: ElementRef;

  valClub: string;
  pdf : string;
  allPlayers?: any;
  dtTrigger: Subject<any> = new Subject();
  headElements: string[] = ["Nombre", "Apellidos", "CURP", "Acciones"];
  constructor(private userLigueService:UserLigueService,
              private toastr: ToastMessagesService,
              private ngxSpin: NgxSpinnerService) { }


  ngOnInit(): void {
    this.initPlayers();
  }


  initPlayers=()=>{
    this.ngxSpin.show();
    this.userLigueService.getAllPlayersByclubAndUser().snapshotChanges().
    pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
      )
      ).
      subscribe(values=>{
      this.allPlayers=values;     
      this.ngxSpin.hide();
    });
  }

  removeUserLiguePlayer=(userIdToRemove:string):void=>{
    this.userLigueService.removeUserLiguePlayer(userIdToRemove);
  }

  sendToModalIdClient=(idClient:string)=>{
    console.log("el idcliente: ",idClient)
    window['idClientGlobal']= idClient;
  }
}

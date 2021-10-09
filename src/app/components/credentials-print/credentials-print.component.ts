import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { StorageService } from 'src/app/core/storage.service';

@Component({
  selector: 'app-credentials-print',
  templateUrl: './credentials-print.component.html',
  styleUrls: ['./credentials-print.component.css']
})
export class CredentialsPrintComponent implements OnInit {

  @Input()
  public credentials?: any[];
  public pages: number;
  constructor(private stServ: StorageService,
              private ngxSpin: NgxSpinnerService) { }

  ngOnInit(): void {
    let strCreds = this.stServ.getDataStorage("credentialsData");
    let credsLoc = JSON.parse(strCreds);
    let doubCreds = JSON.parse(credsLoc);
    console.log("--> ",  doubCreds);
    this.credentials = doubCreds;
    this.ngxSpin.hide();
  }

  getPagePerCreds=()=>{
    let pages = this.credentials.length / 4;
  }
}

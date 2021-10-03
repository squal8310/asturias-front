import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/storage.service';

@Component({
  selector: 'app-credentials-print',
  templateUrl: './credentials-print.component.html',
  styleUrls: ['./credentials-print.component.css']
})
export class CredentialsPrintComponent implements OnInit {

  @Input()
  public credentials?: any[];
  constructor(private stServ: StorageService) { }

  ngOnInit(): void {
    console.log("--> ", this.stServ.getDataStorage("credentialsData") );
  }

}

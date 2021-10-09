import { Component, Input, OnInit } from '@angular/core';
import { UserLigue } from 'src/app/core/models/user-ligue.model';

@Component({
  selector: 'app-credential',
  templateUrl: './credential.component.html',
  styleUrls: ['./credential.component.css']
})
export class CredentialComponent implements OnInit {

  @Input()
  public credentialp:UserLigue;

  constructor() { }

  ngOnInit(): void {
  }

}

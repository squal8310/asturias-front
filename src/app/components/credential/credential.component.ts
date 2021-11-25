import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/core/models/player.model';

@Component({
  selector: 'app-credential',
  templateUrl: './credential.component.html',
  styleUrls: ['./credential.component.css']
})
export class CredentialComponent implements OnInit {

  @Input()
  public credentialp:Player;

  constructor() { }

  ngOnInit(): void {
  }

}

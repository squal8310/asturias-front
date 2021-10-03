import { Injectable } from '@angular/core';
import { CredentialsComponent } from 'src/app/components/credentials/credentials.component';
import { PlayersComponent } from 'src/app/components/players/players.component';
import { AdItem } from '../classes/ad-item';

@Injectable({
  providedIn: 'root'
})
export class AdComponentService {

  constructor() { }

  getComponent(){
    return [new AdItem(
      PlayersComponent,
      {name: 'playerComponent'}
    ),
    new AdItem(
      CredentialsComponent,
      {name: 'credentials'}
    )]
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { AuthorizatedGuardGuard } from '../authorizated-guard.guard';
import { LoginComponent } from 'src/app/components/login/login.component';
import { PlayersRegComponent } from 'src/app/components/players-reg/players-reg.component';
import { AppComponent } from 'src/app/app.component';
import { DocumentsComponent } from 'src/app/components/documents/documents.component';
import { PlayersComponent } from 'src/app/components/players/players.component';
import { PlayersQrComponent } from 'src/app/components/players-qr/players-qr.component';
import { CameraQrComponent } from 'src/app/components/camera-qr/camera-qr.component';
import { DelegateRegComponent } from 'src/app/components/delegate-reg/delegate-reg.component';
import { RecoveryPasswordComponent } from 'src/app/components/recovery-password/recovery-password.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: "login", component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [ AuthorizatedGuardGuard ]},
  {
    path: "players",
    component: PlayersRegComponent, 
    canActivate: [ AuthorizatedGuardGuard ]
 },
 {
   path: "getPlayers",
   component: PlayersComponent,
   outlet: "components"
 },
 {
   path: "documents",
   component: DocumentsComponent, 
   canActivate: [ AuthorizatedGuardGuard ]
},
{
  path: "players-qr",
  component: PlayersQrComponent, 
  canActivate: [ AuthorizatedGuardGuard ]
},
{
  path: "camera-qr",
  component: CameraQrComponent, 
  canActivate: [ AuthorizatedGuardGuard ]
},
{
  path: "deleg-reg",
  component: DelegateRegComponent, 
  canActivate: [ AuthorizatedGuardGuard ]
},
{
  path: "recovery-pws",
  component: RecoveryPasswordComponent
}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [ RouterModule ]
})
export class RoutesAppModule { }

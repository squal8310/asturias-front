import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { AuthorizatedGuardGuard } from '../authorizated-guard.guard';
import { LoginComponent } from 'src/app/components/login/login.component';
import { PlayersRegComponent } from 'src/app/components/players-reg/players-reg.component';
import { DocumentsComponent } from 'src/app/components/documents/documents.component';
import { PlayersComponent } from 'src/app/components/players/players.component';
import { PlayersQrComponent } from 'src/app/components/players-qr/players-qr.component';
import { CameraQrComponent } from 'src/app/components/camera-qr/camera-qr.component';
import { DelegateRegComponent } from 'src/app/components/delegate-reg/delegate-reg.component';
import { RecoveryPasswordComponent } from 'src/app/components/recovery-password/recovery-password.component';
import { CatalogManagerComponent } from 'src/app/components/catalog-manager/catalog-manager.component';
import { CredentialsPrintComponent } from 'src/app/components/credentials-print/credentials-print.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: "login", component: LoginComponent},
  { path: 'home', component: HomeComponent},
  {
    path: "players",
    component: PlayersRegComponent
 },
 {
   path: "getPlayers",
   component: PlayersComponent
 },
 {
   path: "documents",
   component: DocumentsComponent
},
{
  path: "catalog",
  component: CatalogManagerComponent
},
{
  path: "players-qr",
  component: PlayersQrComponent, 
  canActivate: [ AuthorizatedGuardGuard ]
},
{
  path: "camera-qr",
  component: CameraQrComponent
},
{
  path: "deleg-reg",
  component: DelegateRegComponent, 
  canActivate: [ AuthorizatedGuardGuard ]
},
{
  path: "recovery-pws",
  component: RecoveryPasswordComponent
},
{
  path: "credentials-print",
  component: CredentialsPrintComponent
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

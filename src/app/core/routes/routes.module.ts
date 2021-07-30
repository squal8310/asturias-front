import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { AuthorizatedGuardGuard } from '../authorizated-guard.guard';
import { LoginComponent } from 'src/app/components/login/login.component';
import { DelegatesComponent } from 'src/app/components/delegates/delegates.component';
import { AppComponent } from 'src/app/app.component';
import { DocumentsComponent } from 'src/app/components/documents/documents.component';
import { PlayersComponent } from 'src/app/components/players/players.component';

const appRoutes: Routes = [
  { path: "", component: LoginComponent, pathMatch: "full" },
  { path: 'home', component: HomeComponent, canActivate: [ AuthorizatedGuardGuard ] },
  { path: 'login', component: LoginComponent },
  {
    path: "players",
    component: DelegatesComponent
 },
 {
   path: "getPlayers",
   component: PlayersComponent
 },
 {
   path: "documents",
   component: DocumentsComponent
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

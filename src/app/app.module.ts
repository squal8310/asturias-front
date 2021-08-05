import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { RegisterComponent } from './components/register/register.component';
import { DelegatesComponent } from './components/delegates/delegates.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RoutesAppModule } from './core/routes/routes.module';
import { DocumentsComponent } from './components/documents/documents.component';
import { PlayersComponent } from './components/players/players.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayersQrComponent } from './components/players-qr/players-qr.component'
// the scanner!
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CameraQrComponent } from './components/camera-qr/camera-qr.component';

@NgModule({
  imports:      [  BrowserModule, FormsModule, ReactiveFormsModule, RoutesAppModule, PdfViewerModule, 
    BrowserAnimationsModule,
    ZXingScannerModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot()  ],
  declarations: [ AppComponent, HelloComponent, RegisterComponent, DelegatesComponent, LoginComponent, HomeComponent, DocumentsComponent, PlayersComponent, PlayersQrComponent, CameraQrComponent ],
  bootstrap:    [ AppComponent ],
  exports: [RoutesAppModule]
})
export class AppModule { }

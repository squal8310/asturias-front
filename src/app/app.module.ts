import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { RegisterComponent } from './components/register/register.component';
import { PlayersRegComponent } from './components/players-reg/players-reg.component';
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
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';
import { DelegateRegComponent } from './components/delegate-reg/delegate-reg.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RecoveryPasswordComponent } from './components/recovery-password/recovery-password.component';

import { firebasedata } from 'src/environments/environment';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { UploadListComponent } from './components/upload-list/upload-list.component';
import { UploadDetailsComponent } from './components/upload-details/upload-details.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { CatalogManagerComponent } from './components/catalog-manager/catalog-manager.component';

@NgModule({
  imports:      [  BrowserModule, FormsModule, ReactiveFormsModule, RoutesAppModule, PdfViewerModule, 
    BrowserAnimationsModule,
    ZXingScannerModule,
    NgxSpinnerModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    AngularFireModule.initializeApp(firebasedata.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right",
      //preventDuplicates: true
      }),
      ToastNoAnimationModule.forRoot(),  ],
  declarations: [ AppComponent, 
    HelloComponent, 
    RegisterComponent,
    PlayersRegComponent, 
    LoginComponent, 
    HomeComponent, 
    DocumentsComponent, 
    PlayersComponent, 
    PlayersQrComponent, 
    CameraQrComponent,
    DelegateRegComponent, 
    RecoveryPasswordComponent, UploadFormComponent, UploadListComponent, UploadDetailsComponent, CatalogManagerComponent],
  bootstrap:    [ AppComponent ],
  exports: [RoutesAppModule]
})
export class AppModule { }
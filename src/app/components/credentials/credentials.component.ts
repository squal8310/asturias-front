import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { CatalogsServiceService } from 'src/app/core/services/catalogs-service.service';
import { ToastMessagesService } from 'src/app/core/services/toast-messages.service';
import { UploadFileServiceService } from 'src/app/core/services/upload-file-service.service';
import { UserLigueService } from 'src/app/core/services/user-ligue.service';
import { StorageService } from 'src/app/core/storage.service';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css']
})
export class CredentialsComponent implements OnInit {
  ngOnInit(): void {
  }

  

}

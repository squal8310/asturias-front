import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastMessagesService {

  constructor(private toastr: ToastrService) { }

  showSuccess(head:string, dataInfo:string) {
    this.toastr.success(head, dataInfo);
  }

  showWarning(head:string, dataInfo:string) {
    this.toastr.warning(head, dataInfo);
  }

  showFail(head:string, dataInfo:string) {
    this.toastr.error(head, dataInfo);
  }
}

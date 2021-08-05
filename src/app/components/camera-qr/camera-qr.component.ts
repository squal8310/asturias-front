import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-camera-qr',
  templateUrl: './camera-qr.component.html',
  styleUrls: ['./camera-qr.component.css']
})
export class CameraQrComponent implements OnInit, OnDestroy {

  scannerEnable: boolean = true;
  @ViewChild('zxingScan')
  scann: ZXingScannerComponent;

  constructor(private router: Router) { }
  ngOnDestroy(): void {
    this.scannerEnable = false;
  }

  ngOnInit(): void {
  }

  onScanSuccess(ev: string){
    const resultStr = ev;
    this.router.navigate(['/players-qr'], {queryParams: { txt: resultStr }});

    // this.scann.stop();
  }

}

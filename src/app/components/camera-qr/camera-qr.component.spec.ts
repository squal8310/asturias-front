import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraQrComponent } from './camera-qr.component';

describe('CameraQrComponent', () => {
  let component: CameraQrComponent;
  let fixture: ComponentFixture<CameraQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraQrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

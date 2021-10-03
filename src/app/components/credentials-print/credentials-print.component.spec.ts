import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsPrintComponent } from './credentials-print.component';

describe('CredentialsPrintComponent', () => {
  let component: CredentialsPrintComponent;
  let fixture: ComponentFixture<CredentialsPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredentialsPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialsPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

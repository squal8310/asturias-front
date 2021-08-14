import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateRegComponent } from './delegate-reg.component';

describe('DelegateRegComponent', () => {
  let component: DelegateRegComponent;
  let fixture: ComponentFixture<DelegateRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegateRegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegateRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

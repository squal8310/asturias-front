import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersQrComponent } from './players-qr.component';

describe('PlayersQrComponent', () => {
  let component: PlayersQrComponent;
  let fixture: ComponentFixture<PlayersQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersQrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

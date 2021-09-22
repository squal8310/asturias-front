import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersRegComponent } from './players-reg.component';

describe('DelegatesComponent', () => {
  let component: PlayersRegComponent;
  let fixture: ComponentFixture<PlayersRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersRegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

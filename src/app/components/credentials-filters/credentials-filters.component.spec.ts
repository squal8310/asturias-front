import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsFiltersComponent } from './credentials-filters.component';

describe('CredentialsFiltersComponent', () => {
  let component: CredentialsFiltersComponent;
  let fixture: ComponentFixture<CredentialsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredentialsFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

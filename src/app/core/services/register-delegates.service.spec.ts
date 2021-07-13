import { TestBed } from '@angular/core/testing';

import { RegisterDelegatesService } from './register-delegates.service';

describe('RegisterDelegatesService', () => {
  let service: RegisterDelegatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterDelegatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

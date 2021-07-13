import { TestBed } from '@angular/core/testing';

import { AuthorizatedGuardGuard } from './authorizated-guard.guard';

describe('AuthorizatedGuardGuard', () => {
  let guard: AuthorizatedGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorizatedGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

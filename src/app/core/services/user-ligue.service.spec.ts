import { TestBed } from '@angular/core/testing';

import { UserLigueService } from './user-ligue.service';

describe('UserLigueService', () => {
  let service: UserLigueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLigueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

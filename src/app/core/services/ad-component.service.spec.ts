import { TestBed } from '@angular/core/testing';

import { AdComponentService } from './ad-component.service';

describe('AdComponentService', () => {
  let service: AdComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

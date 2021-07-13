import { TestBed } from '@angular/core/testing';

import { CatalogsServiceService } from './catalogs-service.service';

describe('CatalogsServiceService', () => {
  let service: CatalogsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

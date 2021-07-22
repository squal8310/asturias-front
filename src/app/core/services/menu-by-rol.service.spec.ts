import { TestBed } from '@angular/core/testing';

import { MenuByRolService } from './menu-by-rol.service';

describe('MenuByRolService', () => {
  let service: MenuByRolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuByRolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

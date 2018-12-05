import { TestBed } from '@angular/core/testing';

import { RetrieveusersService } from './retrieveusers.service';

describe('RetrieveusersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RetrieveusersService = TestBed.get(RetrieveusersService);
    expect(service).toBeTruthy();
  });
});

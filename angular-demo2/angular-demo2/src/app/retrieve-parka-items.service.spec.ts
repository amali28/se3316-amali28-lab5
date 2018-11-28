import { TestBed } from '@angular/core/testing';

import { RetrieveParkaItemsService } from './retrieve-parka-items.service';

describe('RetrieveParkaItemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RetrieveParkaItemsService = TestBed.get(RetrieveParkaItemsService);
    expect(service).toBeTruthy();
  });
});

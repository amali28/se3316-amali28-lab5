import { TestBed } from '@angular/core/testing';

import { ParkaItemsService } from './parka-items.service';

describe('ParkaItemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParkaItemsService = TestBed.get(ParkaItemsService);
    expect(service).toBeTruthy();
  });
});

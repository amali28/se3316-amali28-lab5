import { TestBed } from '@angular/core/testing';

import { ViewpolicyService } from './viewpolicy.service';

describe('ViewpolicyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewpolicyService = TestBed.get(ViewpolicyService);
    expect(service).toBeTruthy();
  });
});

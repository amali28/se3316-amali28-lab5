import { TestBed } from '@angular/core/testing';

import { ResendService } from './resend.service';

describe('ResendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResendService = TestBed.get(ResendService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ArTrackingService } from './ar-tracking.service';

describe('ArTrackingService', () => {
  let service: ArTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { BookingServices } from './booking-service';

describe('BookingService', () => {
  let service: BookingServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

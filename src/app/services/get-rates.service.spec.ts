import { TestBed } from '@angular/core/testing';

import { GetRatesService } from './get-rates.service';

describe('GetRatesService', () => {
  let service: GetRatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetRatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

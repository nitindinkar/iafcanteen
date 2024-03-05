import { TestBed } from '@angular/core/testing';

import { ConstServiceService } from './const-service.service';

describe('ConstServiceService', () => {
  let service: ConstServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

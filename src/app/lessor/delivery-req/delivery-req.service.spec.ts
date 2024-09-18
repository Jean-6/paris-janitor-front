import { TestBed } from '@angular/core/testing';

import { DeliveryReqService } from './delivery-req.service';

describe('DeliveryReqService', () => {
  let service: DeliveryReqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryReqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

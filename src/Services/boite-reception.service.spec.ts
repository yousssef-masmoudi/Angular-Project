import { TestBed } from '@angular/core/testing';

import { BoiteReceptionService } from './boite-reception.service';

describe('BoiteReceptionService', () => {
  let service: BoiteReceptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoiteReceptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

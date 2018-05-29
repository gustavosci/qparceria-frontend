import { TestBed, inject } from '@angular/core/testing';

import { UfService } from './uf.service';

describe('UfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UfService]
    });
  });

  it('should be created', inject([UfService], (service: UfService) => {
    expect(service).toBeTruthy();
  }));
});

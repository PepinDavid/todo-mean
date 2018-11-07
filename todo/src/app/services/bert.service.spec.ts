import { TestBed, inject } from '@angular/core/testing';

import { BertService } from './bert.service';

describe('BertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BertService]
    });
  });

  it('should be created', inject([BertService], (service: BertService) => {
    expect(service).toBeTruthy();
  }));
});

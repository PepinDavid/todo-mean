import { TestBed, inject } from '@angular/core/testing';

import { ListtodoService } from './listtodo.service';

describe('ListtodoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListtodoService]
    });
  });

  it('should be created', inject([ListtodoService], (service: ListtodoService) => {
    expect(service).toBeTruthy();
  }));
});

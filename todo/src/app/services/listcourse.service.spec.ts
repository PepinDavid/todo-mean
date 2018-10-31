import { TestBed, inject } from '@angular/core/testing';

import { ListcourseService } from './listcourse.service';

describe('ListcourseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListcourseService]
    });
  });

  it('should be created', inject([ListcourseService], (service: ListcourseService) => {
    expect(service).toBeTruthy();
  }));
});

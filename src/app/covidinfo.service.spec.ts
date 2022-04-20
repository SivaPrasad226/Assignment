import { TestBed } from '@angular/core/testing';

import { CovidinfoService } from './covidinfo.service';

describe('CovidinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CovidinfoService = TestBed.get(CovidinfoService);
    expect(service).toBeTruthy();
  });
});

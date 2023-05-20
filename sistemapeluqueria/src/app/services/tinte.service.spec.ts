import { TestBed } from '@angular/core/testing';

import { TinteService } from './tinte.service';

describe('TinteService', () => {
  let service: TinteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TinteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

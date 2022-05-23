import { TestBed } from '@angular/core/testing';

import { KreditService } from './kredit.service';

describe('KreditService', () => {
  let service: KreditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KreditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

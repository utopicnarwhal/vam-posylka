import { TestBed } from '@angular/core/testing';

import { LeadService } from './lead.service';

describe('LeadServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeadService = TestBed.get(LeadService);
    expect(service).toBeTruthy();
  });
});

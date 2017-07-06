import { TestBed, inject } from '@angular/core/testing';

import { EnvironmentSpecificService } from './environment-specific.service';

describe('EnvironmentSpecificService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnvironmentSpecificService]
    });
  });

  it('should ...', inject([EnvironmentSpecificService], (service: EnvironmentSpecificService) => {
    expect(service).toBeTruthy();
  }));
});
import { TestBed } from '@angular/core/testing';

import { SecretEventsService } from './secret-events.service';

describe('SecretEventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecretEventsService = TestBed.get(SecretEventsService);
    expect(service).toBeTruthy();
  });
});

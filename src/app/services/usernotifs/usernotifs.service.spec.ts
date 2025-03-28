import { TestBed } from '@angular/core/testing';

import { UsernotifsService } from './usernotifs.service';

describe('UsernotifsService', () => {
  let service: UsernotifsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsernotifsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

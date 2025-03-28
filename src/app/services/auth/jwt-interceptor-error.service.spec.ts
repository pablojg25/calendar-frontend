import { TestBed } from '@angular/core/testing';

import { JwtInterceptorErrorService } from './jwt-interceptor-error.service';

describe('JwtInterceptorErrorService', () => {
  let service: JwtInterceptorErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtInterceptorErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

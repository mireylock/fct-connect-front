import { TestBed } from '@angular/core/testing';

import { userService } from './user.service';

describe('AlumnosService', () => {
  let service: userService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(userService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

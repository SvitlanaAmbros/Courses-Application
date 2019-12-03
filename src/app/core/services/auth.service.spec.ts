import { TestBed } from '@angular/core/testing';

import { AuthService } from '@core/services/auth.service';
import { LocalStorageService } from '@shared/services/local-storage.service';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthService,
      LocalStorageService
    ]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    const localStorageService: LocalStorageService = TestBed.get(LocalStorageService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PopupService } from '@shared/services/popup.service';

describe('PopupService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PopupService
    ]
  }));

  it('should be created', () => {
    const service: PopupService = TestBed.get(PopupService);
    expect(service).toBeTruthy();
  });
});

import { Injectable, ChangeDetectorRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public showLoading: boolean;

  constructor() { }

  public showLoadingWindow(): void {
    this.showLoading = true;
  }

  public hideLoadingWindow(): void {
    this.showLoading = false;
  }
}

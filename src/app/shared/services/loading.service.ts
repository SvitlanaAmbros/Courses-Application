import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private subject = new Subject<boolean>();

  constructor() { }

  public getLoadingState(): Observable<boolean> {
    return this.subject.asObservable();
  }

  public showLoadingWindow(): void {
    this.subject.next(true);
  }

  public hideLoadingWindow(): void {
    this.subject.next(false);
  }
}

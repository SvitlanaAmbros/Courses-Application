import { Injectable } from '@angular/core';

export class PopupControls {
  public isOpened: boolean;

  constructor() {
    this.isOpened = false;
  }

  public open() {
    this.isOpened = true;
  }

  public close() {
    this.isOpened = false;
  }

  public popupIsOpened() {
    return this.isOpened;
  }
}

@Injectable()
export class PopupService {
  public create(): PopupControls {
    return new PopupControls();
  }
}

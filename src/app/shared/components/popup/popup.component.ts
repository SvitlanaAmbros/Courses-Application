import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  public generatedId: string;

  @Input() public header = 'Confirm Action';
  @Input() public buttonAction = 'OK';
  @Input() public buttonCancel = 'Cancel';
  @Input() public isDisabled: boolean;

  @Output() public onAction = new EventEmitter<void>();
  @Output() public onClose = new EventEmitter<void>();

  constructor() { }

  public action() {
    this.onAction.emit();
  }

  public close() {
    this.onClose.emit();
  }
}

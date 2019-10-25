import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-action-btn',
  templateUrl: './action-btn.component.html',
  styleUrls: ['./action-btn.component.scss']
})
export class ActionBtnComponent implements OnInit {
  @Input() public title: string;
  @Output() public clicked: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public onClick(): void {
    this.clicked.emit();
  }

}

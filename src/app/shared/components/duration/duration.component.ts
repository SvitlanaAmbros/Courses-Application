import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.scss']
})
export class DurationComponent implements OnInit {
  @Input() duration: number; 
  constructor() { }

  ngOnInit() {
  }

}

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() fullPath: string[] = [];

  constructor() { }

  ngOnInit() {
    console.log(this.fullPath);
  }

}

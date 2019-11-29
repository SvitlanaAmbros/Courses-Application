import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnChanges {
  @Input() fullPath: string[] = [];

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.fullPath);

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.router);
  }

}

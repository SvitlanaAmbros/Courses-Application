import {Component, Input, OnChanges, OnInit, SimpleChanges, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET} from '@angular/router';
import { filter } from 'rxjs/operators';

import { BreadCrumb } from '@core/models/breadcrumb.model';
import { CoursesService } from '@courses/services/courses.service';
import { Course } from '@courses/models/course.model';

const ROUTE_DATA_BREADCRUMB: string = 'breadcrumb';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  public breadcrumbsList: BreadCrumb[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdref: ChangeDetectorRef,
    private coursesService: CoursesService) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
        let root: ActivatedRoute = this.activatedRoute.root;
        this.breadcrumbsList = this.getBreadcrumbs(root);
    })
  }


  private getBreadcrumbs(route: ActivatedRoute, url: string='', breadcrumbs: BreadCrumb[]=[]): BreadCrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (!!child.snapshot.params.id) {
        const currentCourse:Course = this.coursesService.getCourseById(child.snapshot.params.id);
        breadcrumbs.push({ label: currentCourse.title, url: routeURL });
      } else {
        if (!!child.snapshot.data[ROUTE_DATA_BREADCRUMB]) {
          breadcrumbs.push({label: child.snapshot.data.breadcrumb, url: routeURL });
        }
      }

      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }
}

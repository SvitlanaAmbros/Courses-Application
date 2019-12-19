import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { BreadCrumb } from '@core/models/breadcrumb.model';
import { AppState } from '@store/reducers/app.reducers';
import { selectCourseById } from '@store/selectors/courses.selector';
import * as coursesActions from '@store/actions/courses.actions';
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
    private store: Store<AppState>) {}

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
        this.store.dispatch(new coursesActions.SetCurrentCourseId(child.snapshot.params.id));
        this.store.pipe(select(selectCourseById)).subscribe((res: Course) => {
          if(!!res) {
            breadcrumbs.push({ label: res.title, url: routeURL });
          }
        });
      } else {
        if (!!child.snapshot.data[ROUTE_DATA_BREADCRUMB]) {
          breadcrumbs.push({label: child.snapshot.data.breadcrumb, url: routeURL });
        }
      }

      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }
}

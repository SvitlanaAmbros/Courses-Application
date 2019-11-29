import {Component, Input, OnChanges, OnInit, SimpleChanges, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET} from '@angular/router';
import { BreadCrumb } from '../models/breadcrumb.model';
import { filter, map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  public breadcrumbsList: BreadCrumb[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdref: ChangeDetectorRef) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
        let root: ActivatedRoute = this.activatedRoute.root;
        console.log('Activated route', root);
        this.breadcrumbsList = this.getBreadcrumbs(root);
        console.log(this.breadcrumbsList);
    })
   

  }


  private getBreadcrumbs(route: ActivatedRoute, url: string="", breadcrumbs: BreadCrumb[]=[]): BreadCrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      console.log('!!!', child.snapshot.params.id);
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (!!child.snapshot.params.id) {
        breadcrumbs.push({ label: child.snapshot.params.id, url: routeURL });
      } else {
        console.log('Shapshot', child.snapshot.data.breadcrumb);
        if (!!child.snapshot.data.breadcrumb) {
          breadcrumbs.push({label: child.snapshot.data.breadcrumb, url: routeURL });
        }
      }

      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }
}

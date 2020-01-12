import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, fromEvent, Subject} from 'rxjs';
import {map, filter, startWith, debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';

import {PopupService, PopupControls} from '@shared/services/popup.service';
import * as coursesActions from '@store/actions/courses.actions';
import {AppState} from '@store/reducers/app.reducers';
import {selectCourses, selectCoursesLength, selectSearchFragment} from '@store/selectors/courses.selector';
import {Course} from '@courses/models/course.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchValue', {static: false}) searchValue: ElementRef;
  public searchValueChanged$: Observable<string>;
  public unsubscribe = new Subject();

  public courses$: Observable<Course[]>;
  public coursesSize: number;
  public courses: Course[] = [];
  public allCourses: Course[];
  public search = '';

  public startLoadingFromIndex = 0;
  public countLoadingCourses = 2;

  public popupControls: PopupControls;
  public deletedItemId: string;

  public emmiter;

  constructor(private popupService: PopupService,
              private router: Router,
              private store: Store<AppState>) {
  }

  public testDate = 'blue';

  ngOnInit() {
    this.initPopup();

    this.courses$ = this.store.pipe(select(selectCourses));
    this.store.pipe(select(selectSearchFragment)).subscribe(res => this.search = res);
    this.store.pipe(select(selectCoursesLength)).subscribe(res => this.startLoadingFromIndex = res);

    this.loadCourses();
  }

  ngAfterViewInit(): void {
    this.searchValueChanged$ = fromEvent<any>(this.searchValue.nativeElement, 'keyup')
      .pipe(
        takeUntil(this.unsubscribe),
        map(event => event.target.value),
        startWith(''),
        filter(res => res.length >= 3),
        debounceTime(700),
        distinctUntilChanged()
      )

    this.searchValueChanged$.subscribe(res => {
      this.search = res;
      this.searchCourses();
    });

  }

  public searchCourses(): void {
    this.store.dispatch(new coursesActions.ClearCourses());
    this.loadCourses();
  }

  public loadCourses(): void {
    this.store.dispatch(new coursesActions.ChangeSearchParams({
      startInd: this.startLoadingFromIndex,
      endInd: this.countLoadingCourses,
      searchFragment: this.search
    }));
  }

  public addNewCourse(): void {
    this.router.navigate(['courses', 'new']);
  }

  public editCourse(id: string): void {
    this.router.navigate(['courses', id]);
  }

  public deleteClicked(id: string): void {
    this.deletedItemId = id;
    this.openPopup();
  }

  public deleteCourse(): void {
    this.store.dispatch(new coursesActions.DeleteCourse({
      startInd: 0,
      endInd: this.startLoadingFromIndex,
      searchFragment: this.search,
      deleteId: this.deletedItemId
    }));

    this.closePopup();
  }

  public openPopup(): void {
    this.popupControls.open();
  }

  public closePopup(): void {
    this.popupControls.close();
  }

  private initPopup(): void {
    this.popupControls = this.popupService.create();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}

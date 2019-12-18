import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, fromEvent, Subscription, Subject} from 'rxjs';
import {map, filter, startWith, debounceTime, distinctUntilChanged, finalize, tap, takeUntil} from 'rxjs/operators';

import {SortByDatePipe} from '@shared/pipes/sort-by-date.pipe';
import {PopupService, PopupControls} from '@shared/services/popup.service';
import {CoursesService} from '@courses/services/courses.service';
import {Course} from '@courses/models/course.model';
import {select, Store} from '@ngrx/store';
import {AppState} from '@store/reducers/app.reducers';
import {coursesState, selectCourses, selectCoursesLength} from '@store/selectors/courses.selector';
import * as coursesActions from '@store/actions/courses.actions';

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

  constructor(private sortByDatePipe: SortByDatePipe,
              private coursesService: CoursesService,
              private popupService: PopupService,
              private router: Router,
              private cdref: ChangeDetectorRef,
              private store: Store<AppState>) {
  }

  public testDate = 'blue';

  ngOnInit() {
    this.initPopup();

    this.courses$ = this.store.pipe(select(selectCourses));
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

  // courses list with sort logic
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

  // courses list with editing logic from child component
  public editCourse(id: string): void {
    this.router.navigate(['courses', id]);
  }

  // courses list with editing logic from child component
  public deleteClicked(id: string): void {
    this.deletedItemId = id;
    this.openPopup();
  }

  // courses list with editing logic from child component
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

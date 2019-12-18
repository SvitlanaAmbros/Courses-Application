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
import {coursesState, selectCourses} from '@store/selectors/courses.selector';
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
    // this.loadCoursesFromServer(this.startLoadingFromIndex, this.countLoadingCourses);

    this.courses$ = this.store.pipe(select(selectCourses));
    this.store.dispatch(new coursesActions.LoadCourses());
    // this.store.pipe(select(coursesState)).subscribe(res => console.log('!!', res));
  }

  ngAfterViewInit(): void {
    this.searchValueChanged$ = fromEvent<any>(this.searchValue.nativeElement, 'keyup')
      .pipe(
        takeUntil(this.unsubscribe),
        map(event => event.target.value),
        startWith(''),
        filter(res => res.length >= 3),
        debounceTime(700),
        distinctUntilChanged()/**/
      )

    this.searchValueChanged$.subscribe(res => {
      this.search = res;
      this.searchCourses();
    });

  }

  // courses list with sort logic
  public searchCourses(): void {
    // this.
    this.courses = [];
    this.loadCoursesFromServer(0, 2, this.search);
  }

  public loadMore(): void {
    this.store.dispatch(new coursesActions.ChangeSearchParams({
      startInd: this.startLoadingFromIndex,
      endInd: this.countLoadingCourses,
      searchFragment: this.search
    }));
    // this.loadCoursesFromServer(this.startLoadingFromIndex, this.countLoadingCourses, this.search);
  }

  public loadCoursesFromServer(startInd: number, count: number, textFragment: string = ''): void {
    this.coursesService.getCourses(startInd, count, textFragment)
      .subscribe(res => {
        this.courses = this.courses.concat(res);
        this.startLoadingFromIndex = this.courses.length;
      });
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
    this.coursesService.deleteCourse(this.deletedItemId)
      .subscribe(res => {
        const ind = this.courses.length;
        this.courses = [];
        this.loadCoursesFromServer(0, ind, this.search);
      });

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

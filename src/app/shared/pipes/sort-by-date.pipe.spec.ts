import { COURSES, COURSES_SORTED } from '@courses/mock/courses.mock';
import { SortByDatePipe } from '@shared/pipes/sort-by-date.pipe';

describe('SortByDatePipe', () => {
  let pipe: SortByDatePipe;

  beforeEach(() => {
    pipe = new SortByDatePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort array by date', () => {
    expect(pipe.transform(COURSES)).toEqual(COURSES_SORTED);
  });
});

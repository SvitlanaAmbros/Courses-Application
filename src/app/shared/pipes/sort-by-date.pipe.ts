import { Pipe, PipeTransform } from '@angular/core';

import { Course } from '@courses/models/course.model';

@Pipe({
  name: 'sortByDate'
})
export class SortByDatePipe implements PipeTransform {
  transform(arr: Course[]): any {
    return arr.sort((a: Course, b: Course) =>
      a.creationDate.getTime() - b.creationDate.getTime());
  }
}

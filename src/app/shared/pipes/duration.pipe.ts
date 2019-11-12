import { Pipe, PipeTransform } from '@angular/core';

export const COUNT_MINUTES_PER_HOUR = 60;

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(value: number): any {
    const hours = Math.floor(value / COUNT_MINUTES_PER_HOUR);
    const minutes = value - hours * COUNT_MINUTES_PER_HOUR;

    return hours !== 0 ? `${hours} h ${minutes}min` : `${minutes}min`;
  }
}

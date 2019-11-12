import { DurationPipe } from '@shared/pipes/duration.pipe';

describe('DurationPipe', () => {
  let pipe: DurationPipe;

  beforeEach(() => {
    pipe = new DurationPipe();
  });

  it('should return only minutes', () => {
    const duration = 35;
    const expected = '35min';

    expect(pipe.transform(duration)).toEqual(expected);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return hours and  minutes', () => {
    const duration = 70;
    const expected = '1 h 10min';

    expect(pipe.transform(duration)).toEqual(expected);
  });

  it('should return only minutes', () => {
    const duration = 150;
    const expected = '2 h 30min';

    expect(pipe.transform(duration)).toEqual(expected);
  });
});

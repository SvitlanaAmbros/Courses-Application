import { Course } from '@courses/models/course.model';
import { CourseDB } from '@courses/models/course-db.model';

export class CourseInfo implements Course {
    id: string | number;
    title: string;
    creationDate: Date;
    duration: number | string;
    description: string;
    topRated: boolean;

    constructor(courseDb: CourseDB) {
        this.id = courseDb.id;
        this.title = courseDb.name;
        this.creationDate = new Date(courseDb.date);
        this.duration = courseDb.length;
        this.description = courseDb.description;
        this.topRated = courseDb.isTopRated;
    }
}

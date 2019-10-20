import { Course } from '@courses/models/course.model';

export class CourseInfo implements Course {
    id: string;
    title: string;
    creationDate: Date;
    duration: number | string;
    description: string;

    constructor(id: string, title: string, creationDate: Date,
                duration: (number | string), description: string) {
        this.id = id;
        this.title = title;
        this.creationDate = creationDate;
        this.duration = duration;
        this.description = description;
    }
}
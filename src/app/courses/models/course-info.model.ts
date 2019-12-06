import { Course } from '@courses/models/course.model';
import { CourseDB } from '@courses/models/course-db.model';
import {Author} from "@courses/models/author.model";

export class CourseInfo implements Course {
    id: number;
    title: string;
    creationDate: Date;
    duration: number;
    description: string;
    topRated: boolean;

    constructor(courseDb?: CourseDB) {
        this.id = (!!courseDb && courseDb.id) || 0;
        this.title = (!!courseDb && courseDb.name) || '';
        this.creationDate = (!!courseDb && new Date(courseDb.date)) || new Date();
        this.duration = (!!courseDb && courseDb.length) || 0;
        this.description = (!!courseDb && courseDb.description) || '';
        this.topRated = (!!courseDb && courseDb.isTopRated) || false;
    }

    public getDbObj(): CourseDB {
      return {
        id: this.id ? this.id : Math.random(),
        name: this.title,
        date: this.creationDate.toString(),
        description: this.description,
        isTopRated: this.topRated,
        authors: [],
        length: this.duration
      };
    }
}

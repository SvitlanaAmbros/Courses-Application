import { Course } from '@courses/models/course.model';
import { CourseDB } from '@courses/models/course-db.model';
import {Author} from "@courses/models/author.model";

export class CourseInfo implements Course {
    id?: number;
    title: string;
    creationDate: Date;
    duration: number;
    description: string;
    topRated?: boolean;
    authors?: Author[];

    constructor(courseDb?: CourseDB) {
        this.id = (!!courseDb && courseDb.id) || this.generateId();
        this.title = (!!courseDb && courseDb.name) || '';
        this.creationDate = (!!courseDb && new Date(courseDb.date)) || new Date();
        this.duration = (!!courseDb && courseDb.length) || 0;
        this.description = (!!courseDb && courseDb.description) || '';
        this.topRated = (!!courseDb && courseDb.isTopRated) || false;
        this.authors = (!!courseDb && courseDb.authors) || [];
    }

    public getDbObj(): CourseDB {
      return {
        id: this.id ? this.id : this.generateId(),
        name: this.title,
        date: this.creationDate.toString(),
        description: this.description,
        isTopRated: this.topRated,
        authors: this.authors,
        length: this.duration
      };
    }

    public generateId(): number {
      return Math.floor(1000 + Math.random() * 9000)
    }
}

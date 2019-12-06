import {CourseDB} from '@courses/models/course-db.model';

export interface Course {
    id?: number;
    title: string;
    creationDate: Date;
    duration: number;
    description: string;
    topRated?: boolean;
    authors?: string[];

    getDbObj?(): CourseDB;
}

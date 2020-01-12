import {CourseDB} from '@courses/models/course-db.model';
import { Author } from '@courses/models/author.model';

export interface Course {
    id?: number;
    title: string;
    creationDate: Date;
    duration: number;
    description: string;
    topRated?: boolean;
    authors?: Author[];

    setCourse?(course: Course): void;
    getDbObj?(): CourseDB;
}

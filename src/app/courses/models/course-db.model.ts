import { Author } from '@courses/models/author.model';

export interface CourseDB {
    id?: string;
    name: string;
    date: Date;
    duration: number | string;
    description: string;
    isTopRated?: boolean;
    authors?: Author[];
    length: number;
}

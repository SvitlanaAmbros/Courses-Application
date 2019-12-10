import { Author } from '@courses/models/author.model';

export interface CourseDB {
    id?: number;
    name: string;
    date: string;
    description: string;
    isTopRated?: boolean;
    authors?: Author[];
    length: number;
}

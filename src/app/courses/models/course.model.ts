export interface Course {
    id?: string | number;
    title: string;
    creationDate: Date;
    duration: number | string;
    description: string;
    topRated?: boolean;
    authors?: string[];
}

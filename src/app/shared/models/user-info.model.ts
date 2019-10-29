import { User } from '@shared/models/user.model';

export class UserInfo implements User {
    id: string;
    firstName: string;
    lastName: string;

    constructor(id: string, firstName: string, lastName: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public getFullUserName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}

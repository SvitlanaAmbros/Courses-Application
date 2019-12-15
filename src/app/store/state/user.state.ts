import { LoginUser } from '@app/models/user.model'

export interface UserState {
    user: LoginUser;
  }
export const initialState: UserState = {
    user: {
        id: '',
        login: '',
        password: '',
        token: '',
        name: {
            firstName: '',
            lastName: ''
        }
    }
};
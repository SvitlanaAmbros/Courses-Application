import { LoginUser } from '@app/models/user.model'

export interface State {
    user: LoginUser;
  }
export const initialState: State = {
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
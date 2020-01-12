import { LoginUser } from '@app/models/user.model';

export interface LoginPageState {
  user: LoginUser;
}
export const initialState: LoginPageState = {
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

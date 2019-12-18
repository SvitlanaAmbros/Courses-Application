import {initialState, LoginPageState} from '@store/state/user.state';
import * as userActions from '@store/actions/user.actions';

export function reducer(state = initialState,
                        action: userActions.UserAction): LoginPageState {
  switch (action.type) {
    case userActions.LOGIN: {
      return {
        ...state,
        user: action.payload
      };
    }
    case userActions.LOGIN_SUCCESS: {
      console.log('LOGIN SUCCESS', action.payload);
      return {
        ...state,
        user: action.payload
      };
    }
    case userActions.LOGOFF: {
      console.log('logoff red', state);
      return {
        ...state,
        user: {
          login: '',
          password: '',
          token: ''
        }
      };
    }
    case userActions.GET_USER_SUCCESSFUL: {
      return {
        ...state,
        user: action.payload
      };
    }

    default:
      return state;
  }
}

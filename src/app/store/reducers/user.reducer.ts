import { initialState } from '@store/state/user.state';
import * as userActions from '@store/actions/user.actions';

export function reducer(state = initialState, 
    action: userActions.UserAction) {
      switch (action.type) {
        case userActions.LOGIN: {
          return {
            ...state,
            user: action.payload
          };
        }
        case userActions.LOGOFF: {  
            return {
                ...state,
                user:{}
            };
        }
        default:
          return state;
      }
  }
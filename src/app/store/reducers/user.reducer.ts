import { initialState } from '@store/state/user.state';
import * as userActions from '@store/actions/user.actions';

export function reducer(state = initialState, 
    action: userActions.UserAction) {
      switch (action.type) {
        // case userActions.LOGIN: {
        //     console.log('login red', action.payload);
        //   return {
        //     ...state,
        //     user: action.payload
        //   };
        // }
        case userActions.LOGOFF: {  
            return {
                ...state,
                user:{}
            };
        }
        case userActions.GET_USER_INFO: {  
            
            console.log('success', action.payload)
            return {
                ...state,
                user: action.payload
            };
        }
        case userActions.LOGIN_FAILED: {  
            console.log('failed', action.payload)
            return {
                ...state,
                // user: action.payload
            };
        }
        default:
          return state;
      }
  }
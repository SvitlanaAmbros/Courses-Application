import { initialState, State } from '@store/state/user.state';
import * as userActions from '@store/actions/user.actions';
import { act } from '@ngrx/effects';

export function reducer(state = initialState, 
    action: userActions.UserAction): State {
      switch (action.type) {
        case userActions.LOGIN: {
            console.log('login red', state);
            return {
                ...state,
                user: action.payload
            };
        }
        case userActions.LOGOFF: {  
            console.log('logoff red', state);
            return {
                ...state,
                user:{
                    login: '',
                    password: ''
                }
            };
        }
        case userActions.SET_USER_INFO: {  
            console.log('Action payad', action.payload);
            return {
                ...state,
                user: action.payload
            };
        }
        case userActions.LOGIN_FAILED: {  
            console.log('failed', action.payload)
            return {
                ...state
            };
        }
        default:
          return state;
      }
  }
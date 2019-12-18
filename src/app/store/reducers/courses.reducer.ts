import {CoursesState, initialState} from '@store/state/courses.state';
import * as coursesActions from '@store/actions/courses.actions';

export function coursesReducer(state = initialState,
                               action: coursesActions.CoursesAction): CoursesState {
  switch (action.type) {
    case coursesActions.CHANGE_SEARCH_PARAMS: {
      return {
        ...state,
        startInd: action.payload.startInd,
        endInd: action.payload.endInd,
        searchFragment: action.payload.searchFragment
      };
    }
    case coursesActions.LOAD_COURSES_SUCCESSFUL: {
      console.log('Reducer value', action.payload)
      return {
        ...state,
        courses: action.payload
      };
    }
    default:
      return state;
  }
}

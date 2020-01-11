import {CoursesState, initialState} from '@store/state/courses.state';
import * as coursesActions from '@store/actions/courses.actions';

export function coursesReducer(state = initialState,
                               action: coursesActions.CoursesAction): CoursesState {
  switch (action.type) {
    case coursesActions.CHANGE_SEARCH_PARAMS: {
      return {
        ...state
      };
    }
    case coursesActions.LOAD_COURSES: {
      return {
        ...state,
        searchFragment: action.payload.searchFragment
      };
    }
    case coursesActions.LOAD_COURSES_SUCCESSFUL: {
      return {
        ...state,

        courses: [...state.courses].concat(action.payload)
      };
    }
    case coursesActions.CLEAR_COURSES: {
      return {
        ...state,
        courses: []
      };
    }
    case coursesActions.CLEAR_CURRENT_COURSE: {
      return {
        ...state,
        currentCourse: {
          title: '',
          description: '',
          duration: 10,
          creationDate: new Date()
        }
      };
    }
    case coursesActions.SET_CURRENT_COURSE_ID: {
      return {
        ...state,
        currentCourseId: action.payload
      }
    }
    case coursesActions.DELETE_COURSE: {
      return {
        ...state,
        courses: []
      };
    }
    case coursesActions.GET_COURSE_BY_ID_SUCCESS: {
      return {
        ...state,
        currentCourse: action.payload
      };
    }
    case coursesActions.CHANGED_COURSE_SUCCESSFUL: {
      return {
        ...state,
        courses: []
      };
    }
    default:
      return state;
  }
}

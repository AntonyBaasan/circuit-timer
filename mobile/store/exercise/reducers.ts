import { DEMO_EXERCISE } from '../../data/example';
import { Action } from 'redux';
import { ExerciseReducerState } from './models';

const initState: ExerciseReducerState = {
  exercises: DEMO_EXERCISE,
};

const exerciseReducer = (
  state: ExerciseReducerState = initState,
  action: Action
) => {
  switch (action.type) {
    case ACTION_GET_EXERCISE:
      return state;
    default:
      return state;
  }
};

export default exerciseReducer;
import { DEMO_EXERCISE } from '../../data/example';
import { Action } from 'redux';
import { ExerciseReducerState } from '../models';
import * as exerciseActions from './actions';

const initState: ExerciseReducerState = {
  exercises: DEMO_EXERCISE,
};

const exerciseReducer = (
  state: ExerciseReducerState = initState,
  action: Action
) => {
  switch (action.type) {
    case exerciseActions.ACTION_GET_EXERCISE:
      return state;
    default:
      return state;
  }
};

export default exerciseReducer;
import { DEMO_WORKOUT } from '../../data/example';
import { ExerciseState } from '../models';
import { ExerciseActionTypes, LOAD_EXERCISES } from './actionTypes';

const initState: ExerciseState = {
  exercises: [],
};

const exerciseReducer = (
  state: ExerciseState = initState,
  action: ExerciseActionTypes
): ExerciseState => {
  switch (action.type) {
    case LOAD_EXERCISES:
      const workout = DEMO_WORKOUT.find((w) => w.id === action.payload);
      return {
        ...state,
        exercises: workout ? workout.exercises : [],
      };
    default:
      return state;
  }
};

export default exerciseReducer;

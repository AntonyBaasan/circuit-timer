import { DEMO_WORKOUT } from '../../data/example';
import { ExerciseState, WorkoutState } from '../models';
import { ExerciseActionTypes, LOAD_EXERCISES } from './actionTypes';

const initState: ExerciseState = {
  exercises: [],
};

const workoutReducer = (
  state: ExerciseState = initState,
  action: ExerciseActionTypes
): ExerciseState => {
  switch (action.type) {
    case LOAD_EXERCISES:
      return {
        ...state,
        exercises: DEMO_WORKOUT.find(w=>w.id === action.payload)?.exercises,
      };
    default:
      return state;
  }
};

export default workoutReducer;

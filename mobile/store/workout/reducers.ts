import { DEMO_WORKOUT } from '../../data/example';
import { WorkoutState } from '../models';
import {
  CREATE_WORKOUT,
  DELETE_WORKOUT,
  WorkoutActionTypes,
  UPDATE_WORKOUT,
} from './actionTypes';

const initState: WorkoutState = {
  workouts: DEMO_WORKOUT,
};

const workoutReducer = (
  state: WorkoutState = initState,
  action: WorkoutActionTypes
): WorkoutState => {
  switch (action.type) {
    case CREATE_WORKOUT:
      return {
        ...state,
        workouts: [...state.workouts, action.payload],
      };
    case UPDATE_WORKOUT:
      const index = state.workouts.findIndex(
        (e) => e.id === action.payload.id
      );
      const updatedWorkout = Object.assign(
        {},
        state.workouts[index],
        action.payload
      );
      const updatedList = state.workouts.splice(index, 1, updatedWorkout);
      return { ...state, workouts: updatedList };
    case DELETE_WORKOUT:
      const listWithRemovedItem = state.workouts.filter(
        (e) => e.id !== action.payload
      );
      return { ...state, workouts: listWithRemovedItem };
    default:
      return state;
  }
};

export default workoutReducer;

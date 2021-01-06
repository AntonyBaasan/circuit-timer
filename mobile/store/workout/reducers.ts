import { DEMO_WORKOUT } from '../../data/example';
import { Workout } from '../../models/Workout';
import { WorkoutState } from '../models';
import {
  LOAD_WORKOUTS,
  CREATE_WORKOUT,
  DELETE_WORKOUT,
  UPDATE_WORKOUT,
  WorkoutActionTypes,
} from './actionTypes';

const initState: WorkoutState = {
  workouts: [],
};

const workoutReducer = (
  state: WorkoutState = initState,
  action: WorkoutActionTypes
): WorkoutState => {
  switch (action.type) {
    case LOAD_WORKOUTS:
      return _loadWorkouts(state);
    case CREATE_WORKOUT:
      return _createWorkout(state, action.payload);
    case UPDATE_WORKOUT:
      return _updateWorkout(state, action.payload);
    case DELETE_WORKOUT:
      return _deleteWorkout(state, action.payload);
    default:
      return state;
  }
};

export default workoutReducer;

function _deleteWorkout(state: WorkoutState, payload: { workoutId: string }) {
  const listWithRemovedItem = state.workouts.filter(
    (e) => e.id !== payload.workoutId
  );
  return { ...state, workouts: listWithRemovedItem };
}

function _updateWorkout(
  state: WorkoutState,
  payload: { workout: Partial<Workout> }
) {
  const index = state.workouts.findIndex((e) => e.id === payload.workout.id);
  const updatedWorkout = Object.assign(
    {},
    state.workouts[index],
    payload.workout
  );

  state.workouts.splice(index, 1, updatedWorkout);
  return { ...state, workouts: [...state.workouts] };
}

function _createWorkout(
  state: WorkoutState,
  payload: { workout: Workout }
): WorkoutState {
  return {
    ...state,
    workouts: [...state.workouts, payload.workout],
  };
}

function _loadWorkouts(state: WorkoutState): WorkoutState {
  return {
    ...state,
    workouts: [...DEMO_WORKOUT],
  };
}

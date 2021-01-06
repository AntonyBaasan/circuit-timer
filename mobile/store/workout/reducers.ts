import { DEMO_WORKOUT } from '../../data/example';
import { WorkoutState } from '../models';
import {
  LOAD_WORKOUTS,
  CREATE_WORKOUT,
  DELETE_WORKOUT,
  UPDATE_WORKOUT,
  WorkoutActionTypes,
  DeleteWorkoutAction,
  UpdateWorkoutAction,
  CreateWorkoutAction,
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
      return _createWorkout(state, action);
    case UPDATE_WORKOUT:
      return _updateWorkout(state, action);
    case DELETE_WORKOUT:
      return _deleteWorkout(state, action);
    default:
      return state;
  }
};

export default workoutReducer;

function _deleteWorkout(state: WorkoutState, action: DeleteWorkoutAction) {
  const listWithRemovedItem = state.workouts.filter(
    (e) => e.id !== action.payload.workoutId
  );
  return { ...state, workouts: listWithRemovedItem };
}

function _updateWorkout(state: WorkoutState, action: UpdateWorkoutAction) {
  const index = state.workouts.findIndex(
    (e) => e.id === action.payload.workout.id
  );
  const updatedWorkout = Object.assign(
    {},
    state.workouts[index],
    action.payload.workout
  );

  state.workouts.splice(index, 1, updatedWorkout);
  return { ...state, workouts: [...state.workouts] };
}

function _createWorkout(
  state: WorkoutState,
  action: CreateWorkoutAction
): WorkoutState {
  return {
    ...state,
    workouts: [...state.workouts, action.payload.workout],
  };
}

function _loadWorkouts(state: WorkoutState): WorkoutState {
  return {
    ...state,
    workouts: [...DEMO_WORKOUT],
  };
}

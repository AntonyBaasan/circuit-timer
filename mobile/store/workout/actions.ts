import { Workout } from '../../models/workout';
import {
  CREATE_WORKOUT,
  DELETE_WORKOUT,
  UPDATE_WORKOUT,
  WorkoutActionTypes,
} from './actionTypes';

export const createWorkout = (workout: Workout): WorkoutActionTypes => {
  return {
    type: CREATE_WORKOUT,
    payload: workout,
  };
};

export const editWorkout = (
  workout: Partial<Workout>
): WorkoutActionTypes => {
  return {
    type: UPDATE_WORKOUT,
    payload: workout,
  };
};

export const deleteWorkout = (workoutId: string): WorkoutActionTypes => {
  return {
    type: DELETE_WORKOUT,
    payload: workoutId,
  };
};

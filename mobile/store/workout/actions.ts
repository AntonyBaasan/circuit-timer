import * as WorkoutDB from '../../helpers/db/workout';
import { Workout } from '../../models/workout';
import {
  LOAD_WORKOUTS,
  CREATE_WORKOUT,
  DELETE_WORKOUT,
  UPDATE_WORKOUT,
  WorkoutActionTypes,
} from './actionTypes';

export const loadWorkouts = () => {
  return async (dispatch: any) => {
    try {
      const result = await WorkoutDB.selectWorkouts();
      const workouts = WorkoutDB.MapResultSetsToWorkouts(result);
      dispatch({ type: LOAD_WORKOUTS, payload: { workouts } });
    } catch (error) {
      console.log('WorkoutDB.selectWorkouts error:');
      console.log(error);
    }
  };
};

export const createWorkout = (workout: Workout): WorkoutActionTypes => {
  return {
    type: CREATE_WORKOUT,
    payload: { workout },
  };
};

export const updateWorkout = (
  workout: Partial<Workout>
): WorkoutActionTypes => {
  return {
    type: UPDATE_WORKOUT,
    payload: { workout },
  };
};

export const deleteWorkout = (workoutId: string): WorkoutActionTypes => {
  return {
    type: DELETE_WORKOUT,
    payload: { workoutId },
  };
};

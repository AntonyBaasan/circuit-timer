import * as WorkoutDB from '../../helpers/db/workout';
import { Exercise } from '../../models/Exercise';
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
      const workouts = await WorkoutDB.selectWorkouts();
      dispatch({ type: LOAD_WORKOUTS, payload: { workouts } });
    } catch (error) {
      console.log('WorkoutDB.selectWorkouts error:');
      console.log(error);
    }
  };
};

export const createWorkout = (workout: Workout, exercises: Exercise[]) => {
  return async (dispatch: any) => {
    try {
      const result = await WorkoutDB.insertWorkout(workout, exercises);
      console.log('WorkoutDB.createWorkout result:');
      console.log(result);
      dispatch({ type: CREATE_WORKOUT, payload: { workout } });
    } catch (error) {
      console.log('WorkoutDB.createWorkout error:');
      console.log(error);
    }
  };
};

export const updateWorkout = (workout: Workout, exercises: Exercise[]) => {
  return async (dispatch: any) => {
    try {
      const result = await WorkoutDB.updateWorkout(workout, exercises);
      console.log('WorkoutDB.updateWorkout result:');
      console.log(result);
      dispatch({ type: UPDATE_WORKOUT, payload: { workout } });
    } catch (error) {
      console.log('WorkoutDB.updateWorkout error:');
      console.log(error);
    }
  };
};

export const deleteWorkout = (workoutId: string): WorkoutActionTypes => {
  return {
    type: DELETE_WORKOUT,
    payload: { workoutId },
  };
};

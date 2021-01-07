import * as WorkoutDB from '../../helpers/db/workout';
import * as ExerciseDB from '../../helpers/db/exercise';
import { Exercise } from '../../models/Exercise';
import { Workout } from '../../models/workout';
import {
  LOAD_WORKOUTS,
  CREATE_WORKOUT,
  DELETE_WORKOUT,
  UPDATE_WORKOUT,
} from './actionTypes';

export const loadWorkouts = () => {
  return async (dispatch: any) => {
    try {
      const workouts = await WorkoutDB.selectWorkouts();
      console.log('WorkoutDB.selectWorkouts result:');
      console.log(workouts);
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
      const insertWorkoutResult = await WorkoutDB.insertWorkout(workout);
      console.log('WorkoutDB.createWorkout result:');
      console.log(insertWorkoutResult);
      const insertExerciseResult = await ExerciseDB.insertExercises(exercises);
      console.log('ExerciseDB.insertExercises result:');
      console.log(insertExerciseResult);
      dispatch({ type: CREATE_WORKOUT, payload: { workout } });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateWorkout = (workout: Workout, exercises: Exercise[]) => {
  return async (dispatch: any) => {
    try {
      const updateWorkoutQuery = await WorkoutDB.updateWorkout(workout);
      console.log('WorkoutDB.updateWorkout result:');
      console.log(updateWorkoutQuery);
      const updateExercisesQuery = await ExerciseDB.updateExercises(exercises);
      console.log('ExerciseDB.updateExercises result:');
      console.log(updateExercisesQuery);
      dispatch({ type: UPDATE_WORKOUT, payload: { workout } });
    } catch (error) {
      console.log('WorkoutDB.updateWorkout error:');
      console.log(error);
    }
  };
};

export const deleteWorkout = (workoutId: string) => {
  return async (dispatch: any) => {
    try {
      const result = await WorkoutDB.deleteWorkout(workoutId);
      console.log('WorkoutDB.deleteWorkout result:');
      console.log(result);
      dispatch({ type: DELETE_WORKOUT, payload: { workoutId } });
    } catch (error) {
      console.log('WorkoutDB.deleteWorkout error:');
      console.log(error);
    }
  };
};

import { ExerciseActionTypes, LOAD_EXERCISES } from './actionTypes';

export const loadExercises = (workoutId: string): ExerciseActionTypes => {
  return {
    type: LOAD_EXERCISES,
    payload: workoutId,
  };
};
import { Exercise } from '../../models/Exercise';
import {
  ADD_EXERCISE,
  ExerciseActionTypes,
  LOAD_EXERCISES,
  REMOVE_EXERCISE,
  UPDATE_EXERCISE,
  REORDER_EXERCISE,
} from './actionTypes';

export const loadExercises = (workoutId: string): ExerciseActionTypes => {
  return {
    type: LOAD_EXERCISES,
    payload: { workoutId },
  };
};
export const addExercises = (
  order: number,
  exercise: Exercise
): ExerciseActionTypes => {
  return {
    type: ADD_EXERCISE,
    payload: { order, exercise },
  };
};
export const removeExercises = (
  workoutId: string,
  exerciseId: string
): ExerciseActionTypes => {
  return {
    type: REMOVE_EXERCISE,
    payload: { workoutId, exerciseId },
  };
};
export const updateExercises = (exercise: Exercise): ExerciseActionTypes => {
  return {
    type: UPDATE_EXERCISE,
    payload: { exercise },
  };
};
export const reoderExercises = (
  workoutId: string,
  exerciseId: string,
  oldOrder: number,
  newOrder: number
): ExerciseActionTypes => {
  return {
    type: REORDER_EXERCISE,
    payload: { workoutId, exerciseId, oldOrder, newOrder },
  };
};

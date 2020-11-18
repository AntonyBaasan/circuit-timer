import { Exercise } from '../../models/exercise';
import {
  CREATE_EXERCISE,
  DELETE_EXERCISE,
  ExerciseActionTypes,
  UPDATE_EXERCISE,
} from './actionTypes';

export const createExercise = (exercise: Exercise): ExerciseActionTypes => {
  return {
    type: CREATE_EXERCISE,
    payload: exercise,
  };
};

export const editExercise = (
  exercise: Partial<Exercise>
): ExerciseActionTypes => {
  return {
    type: UPDATE_EXERCISE,
    payload: exercise,
  };
};

export const deleteExercise = (exerciseId: string): ExerciseActionTypes => {
  return {
    type: DELETE_EXERCISE,
    payload: exerciseId,
  };
};

import { Exercise } from '../../models/exercise';

export const CREATE_EXERCISE = 'CREATRE_EXERCISE';
export const UPDATE_EXERCISE = 'UPDATE_EXERCISE';
export const DELETE_EXERCISE = 'DELETE_EXERCISE';

interface CreateExercise {
  type: typeof CREATE_EXERCISE;
  payload: Exercise;
}

interface UpdateExercise {
  type: typeof UPDATE_EXERCISE;
  payload: Partial<Exercise>;
}

interface DeleteExercise {
  type: typeof DELETE_EXERCISE;
  payload: string;
}

export type ExerciseActionTypes =
  | CreateExercise
  | UpdateExercise
  | DeleteExercise;

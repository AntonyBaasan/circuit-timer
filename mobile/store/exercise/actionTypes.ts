import { Exercise } from '../../models/Exercise';

export const LOAD_EXERCISES = 'LOAD_EXERCISES';
export const ADD_EXERCISE = 'ADD_EXERCISE';
export const REMOVE_EXERCISE = 'REMOVE_EXERCISE';
export const UPDATE_EXERCISE = 'UPDATE_EXERCISE';
export const REORDER_EXERCISE = 'REORDER_EXERCISE';

interface LoadExercises {
  type: typeof LOAD_EXERCISES;
  payload: { workoutId: string }; // workoutId
}
interface AddExercise {
  type: typeof ADD_EXERCISE;
  payload: { order: number; exercise: Exercise };
}
interface RemoveExercise {
  type: typeof REMOVE_EXERCISE;
  payload: { workoutId: string; exerciseId: string }; // exerciseId
}
interface UpdateExercise {
  type: typeof UPDATE_EXERCISE;
  payload: { exercise: Exercise };
}
interface ReorderExercise {
  type: typeof REORDER_EXERCISE;
  payload: {
    workoutId: string;
    exerciseId: string;
    oldOrder: number;
    newOrder: number;
  };
}

export type ExerciseActionTypes =
  | AddExercise
  | RemoveExercise
  | UpdateExercise
  | ReorderExercise
  | LoadExercises;

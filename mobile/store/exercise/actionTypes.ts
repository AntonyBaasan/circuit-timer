export const LOAD_EXERCISES = 'LOAD_EXERCISES';

interface LoadExercises {
  type: typeof LOAD_EXERCISES;
  payload: string; // workoutId
}

export type ExerciseActionTypes = LoadExercises;

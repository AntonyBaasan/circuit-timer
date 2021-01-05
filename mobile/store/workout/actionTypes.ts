import { Workout } from '../../models/workout';

export const LOAD_WORKOUTS = 'LOAD_WORKOUTS';
export const CREATE_WORKOUT = 'CREATRE_WORKOUT';
export const UPDATE_WORKOUT = 'UPDATE_WORKOUT';
export const DELETE_WORKOUT = 'DELETE_WORKOUT';

interface LoadWorkouts {
  type: typeof LOAD_WORKOUTS;
}

interface CreateWorkout {
  type: typeof CREATE_WORKOUT;
  payload: Workout;
}

interface UpdateWorkout {
  type: typeof UPDATE_WORKOUT;
  payload: Partial<Workout>;
}

interface DeleteWorkout {
  type: typeof DELETE_WORKOUT;
  payload: string;
}

export type WorkoutActionTypes =
  | LoadWorkouts
  | CreateWorkout
  | UpdateWorkout
  | DeleteWorkout;

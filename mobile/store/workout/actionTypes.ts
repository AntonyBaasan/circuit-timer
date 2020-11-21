import { Workout } from '../../models/workout';

export const CREATE_WORKOUT = 'CREATRE_WORKOUT';
export const UPDATE_WORKOUT = 'UPDATE_WORKOUT';
export const DELETE_WORKOUT = 'DELETE_WORKOUT';

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

export type WorkoutActionTypes = CreateWorkout | UpdateWorkout | DeleteWorkout;

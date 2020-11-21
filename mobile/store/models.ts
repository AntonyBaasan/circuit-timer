import { Workout } from '../models/workout';

export interface RootState {
    workout: WorkoutState;
}

export interface WorkoutState {
    workouts: Workout[];
}
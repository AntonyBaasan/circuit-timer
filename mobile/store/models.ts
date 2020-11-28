import { Exercise } from '../models/Exercise';
import { Workout } from '../models/workout';

export interface RootState {
    workout: WorkoutState;
    exercise: ExerciseState;
}

export interface WorkoutState {
    workouts: Workout[];
}

export interface ExerciseState{
    exercises: Exercise[];
}
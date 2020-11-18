import { Exercise } from '../models/exercise';

export interface RootState {
    exercise: ExerciseState;
}

export interface ExerciseState {
    exercises: Exercise[];
}
import { Exercise } from '../models/Exercise';
import { Stat } from '../models/Stat';
import { Workout } from '../models/workout';

export interface RootState {
  workout: WorkoutState;
  exercise: ExerciseState;
  stat: StatState;
}

export interface WorkoutState {
  workouts: Workout[];
}

export interface ExerciseState {
  exercises: Exercise[];
}

export interface StatState {
  stat: {
    [day: string]: {
      [workoutId: string]: Stat;
    };
  };
}

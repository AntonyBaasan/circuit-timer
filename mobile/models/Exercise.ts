import { ExerciseType } from './ExcerciseType';

export interface Exercise {
  id: string;
  workoutId: string;
  exerciseType: ExerciseType;
  title: string;
  description?: string;
  sets: number;
  duration?: number;
  hasRest: boolean;
  restTime?: number;
  reps?: number;
  weight?: number;
  image?: string[];
};
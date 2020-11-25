import { ExerciseType } from './ExcerciseType';

export interface Exercise {
  id: string;
  exerciseType: ExerciseType;
  title: string;
  description?: string;
  sets: number;
  duration?: number;
  reps?: number;
  image?: string[];
};
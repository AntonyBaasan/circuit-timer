import { ExerciseType } from './ExcerciseType';

export interface Exercise {
  id: string;
  exerciseType: ExerciseType;
  title: string;
  description?: string;
  duration?: number;
  sets?: number;
  reps?: number;
  image?: string[];
};
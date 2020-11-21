import { ExerciseType } from './ExcerciseType';

export interface Exercise {
  id: string;
  exerciseType: ExerciseType;
  seconds?: number;
  sets?: number;
  reps?: number;
  image?: string[];
};
import { ExerciseType } from './ExcerciseType';

export interface ExerciseTask {
  id: string;
  exerciseId: string;
  exerciseType: ExerciseType;
  title: string;
  description?: string;
  duration?: number;
  reps?: number;
  image?: string[];
}

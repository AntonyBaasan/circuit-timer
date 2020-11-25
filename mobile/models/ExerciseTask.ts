import { ExerciseType } from './ExcerciseType';

export interface ExerciseTask {
    exerciseId: string;
    exerciseType: ExerciseType;
    title: string;
    description?: string;
    duration?: number;
    reps?: number;
    image?: string[];
  };
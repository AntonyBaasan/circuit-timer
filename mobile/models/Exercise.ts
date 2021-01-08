import { ExerciseType } from './ExcerciseType';

export interface Exercise {
  id: string;
  workoutId: string;
  exerciseType: ExerciseType;
  order: number;
  title: string;
  description?: string;
  sets: number;
  duration?: number;
  hasRest: boolean;
  restTime?: number;
  reps?: number;
  weight?: number;
  distance?: number;
  image?: string[];
  metadata: ExerciseMetadata;
}

export interface ExerciseMetadata{
  status: ExerciseMetadataStatus;
}

export enum ExerciseMetadataStatus {
  None = 'none',
  Created = 'created',
  Deleted = 'deleted',
}

import { ExerciseType } from './ExcerciseType';
export enum ExcerciseTaskStatus {
  NotStarted = 'not started',
  Skipped = 'skipped',
  InProgress = 'wip',
  Paused = 'paused',
  Done = 'done',
}

export interface ExerciseTask {
  id: string;
  exerciseId: string;
  exerciseType: ExerciseType;
  title: string;
  description?: string;
  duration?: number;
  reps?: number;
  image?: string[];
  status: ExcerciseTaskStatus;
}

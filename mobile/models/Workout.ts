import { Exercise } from './Exercise';

export type Workout = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  authorId?: string;
  workoutPackageId: string;
  repetition: number;
  exercises: Exercise[];
  image?: string;
};



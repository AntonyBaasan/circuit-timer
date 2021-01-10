import { v4 as uuidv4 } from 'uuid';
import { ExerciseType } from '../models/ExcerciseType';
import { Exercise, ExerciseMetadata, ExerciseMetadataStatus } from '../models/Exercise';
import { Workout } from '../models/Workout';

export const createDefaultWorkout = () => {
  return {
    id: uuidv4(),
    title: 'Default Title',
    description: 'Default Description',
    tags: [
      'tag one',
      'tag2',
      'tag one',
      'tag2fff ',
      'tag onea 123',
      'tag2asdfas',
      'tag one',
      'tag2',
      'tag one',
      'tag2 bla',
    ],
    //   authorId?: string;
    //   workoutPackageId: string;
    exercises: [],
    //   image?: string;
  } as Workout;
};

export const createDefaultExercise = (
  workoutId: string,
  order: number
): Exercise => ({
  id: uuidv4(),
  workoutId: workoutId,
  order: order,
  exerciseType: ExerciseType.Reps,
  title: 'Default title',
  description: 'Default description',
  sets: 3,
  reps: 8,
  hasRest: true,
  restTime: 30,
  // weight?: number;
  // distance?: number;
  // image?: string[];
  metadata: {
    status: ExerciseMetadataStatus.None,
  } as ExerciseMetadata,
});

import { ExerciseType } from '../models/ExcerciseType';
import { Exercise } from '../models/Exercise';
import { Workout } from '../models/Workout';

export const createDefaultWorkout = () => {
  return {
    id: 'new id',
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

export const createDefaultExercise = (): Exercise => ({
  id: 'new id',
  exerciseType: ExerciseType.Reps,
  title: '',
  description: '',
  sets: 3,
  reps: 8,
  hasRest: true,
  restTime: 30,
});

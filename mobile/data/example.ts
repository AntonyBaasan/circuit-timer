import { Workout } from '../models/Workout';
import { ExerciseType } from '../models/ExcerciseType';

/*
export const DEMO_WORKOUT: Workout[] = [];
 */
export const DEMO_WORKOUT: Workout[] = [
  {
    id: '1',
    title: 'Sprint conditioning I',
    description: 'This is a basic workout for improving springing.',
    tags: [],
    workoutPackageId: '1',
    repetition: 2,
    exercises: [
      {
        id: '1',
        exerciseType: ExerciseType.Reps,
        title: 'exercise 1',
        description: 'exercise description',
        image: [''],
        sets: 2,
        reps: 8,

      },
      {
        id: '2',
        exerciseType: ExerciseType.Cardio,
        title: 'exercise 2',
        description: 'exercise description',
        image: [''],
        duration: 5,
        sets: 2,
      },
      {
        id: '3',
        exerciseType: ExerciseType.Reps,
        title: 'exercise 3',
        description: 'exercise description',
        image: [''],
        sets: 3,
        reps: 8,
      },
    ],
  },
  {
    id: '2',
    title: 'Sprint conditioning II',
    description: 'This is a basic workout for improving springing.',
    tags: [],
    workoutPackageId: '1',
    repetition: 2,
    exercises: [
      {
        id: '1',
        exerciseType: ExerciseType.Reps,
        title: 'exercise 1',
        description: 'exercise description',
        image: [''],
        sets: 1,
        reps: 8,
      },
      {
        id: '2',
        exerciseType: ExerciseType.Reps,
        title: 'exercise 2',
        description: 'exercise description',
        image: [''],
        sets: 1,
        reps: 8,
      },
    ],
  },
  // ----
  {
    id: '3',
    title: 'Workout id:3',
    description: 'This is a basic workout for improving springing.',
    tags: [],
    workoutPackageId: '1',
    repetition: 2,
    exercises: [
      {
        id: '1',
        exerciseType: ExerciseType.Reps,
        title: 'some exercise',
        description: 'exercise description',
        duration: 15,
        image: [''],
        sets: 1,
        reps: 8,
      },
      {
        id: '2',
        exerciseType: ExerciseType.Reps,
        title: 'some exercise',
        description: 'exercise description',
        duration: 2,
        image: [''],
        sets: 1,
        reps: 8,
      },
    ],
  },
  {
    id: '4',
    title: 'Workout id:4',
    description: 'This is a basic workout for improving springing.',
    tags: [],
    workoutPackageId: '1',
    repetition: 2,
    exercises: [
      {
        id: '1',
        exerciseType: ExerciseType.Reps,
        title: 'some exercise',
        description: 'exercise description',
        duration: 15,
        image: [''],
        sets: 1,
        reps: 8,
      },
      {
        id: '2',
        exerciseType: ExerciseType.Reps,
        title: 'some exercise',
        description: 'exercise description',
        duration: 2,
        image: [''],
        sets: 1,
        reps: 8,
      },
    ],
  },
  {
    id: '5',
    title: 'Workout id:5',
    description: 'This is a basic workout for improving springing.',
    tags: [],
    workoutPackageId: '1',
    repetition: 2,
    exercises: [
      {
        id: '1',
        exerciseType: ExerciseType.Reps,
        title: 'some exercise',
        description: 'exercise description',
        duration: 15,
        image: [''],
        sets: 1,
        reps: 8,
      },
      {
        id: '2',
        exerciseType: ExerciseType.Reps,
        title: 'some exercise',
        description: 'exercise description',
        duration: 2,
        image: [''],
        sets: 1,
        reps: 8,
      },
    ],
  },
];

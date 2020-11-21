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
        type: ExerciseType.work,
        seconds: 5,
        image: '',
      },
      {
        id: '2',
        type: ExerciseType.work,
        seconds: 3,
        image: '',
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
        type: ExerciseType.work,
        seconds: 15,
        image: '',
      },
      {
        id: '2',
        type: ExerciseType.work,
        seconds: 2,
        image: '',
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
        type: ExerciseType.work,
        seconds: 15,
        image: '',
      },
      {
        id: '2',
        type: ExerciseType.work,
        seconds: 2,
        image: '',
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
        type: ExerciseType.work,
        seconds: 15,
        image: '',
      },
      {
        id: '2',
        type: ExerciseType.work,
        seconds: 2,
        image: '',
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
        type: ExerciseType.work,
        seconds: 15,
        image: '',
      },
      {
        id: '2',
        type: ExerciseType.work,
        seconds: 2,
        image: '',
      },
    ],
  },
];

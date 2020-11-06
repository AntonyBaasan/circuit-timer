import { Exercise } from '../models/exercise';
import { ActionType } from '../models/ActionType';

/*
export const demoExercises: Exercise[] = [];
 */
export const demoExercises: Exercise[] = [
  {
    id: '1',
    title: 'Sprint conditioning I',
    description: 'This is a basic exercise for improving springing.',
    tags: [],
    exercisePackageId: '1',
    repetition: 2,
    actions: [
      {
        id: '1',
        type: ActionType.work,
        seconds: 5,
        image: '',
      },
      {
        id: '2',
        type: ActionType.work,
        seconds: 3,
        image: '',
      },
    ],
  },
  {
    id: '2',
    title: 'Sprint conditioning II',
    description: 'This is a basic exercise for improving springing.',
    tags: [],
    exercisePackageId: '1',
    repetition: 2,
    actions: [
      {
        id: '1',
        type: ActionType.work,
        seconds: 15,
        image: '',
      },
      {
        id: '2',
        type: ActionType.work,
        seconds: 2,
        image: '',
      },
    ],
  },
  // ----
  {
    id: '3',
    title: 'Sprint conditioning II',
    description: 'This is a basic exercise for improving springing.',
    tags: [],
    exercisePackageId: '1',
    repetition: 2,
    actions: [
      {
        id: '1',
        type: ActionType.work,
        seconds: 15,
        image: '',
      },
      {
        id: '2',
        type: ActionType.work,
        seconds: 2,
        image: '',
      },
    ],
  },
  {
    id: '4',
    title: 'Sprint conditioning II',
    description: 'This is a basic exercise for improving springing.',
    tags: [],
    exercisePackageId: '1',
    repetition: 2,
    actions: [
      {
        id: '1',
        type: ActionType.work,
        seconds: 15,
        image: '',
      },
      {
        id: '2',
        type: ActionType.work,
        seconds: 2,
        image: '',
      },
    ],
  },
  {
    id: '5',
    title: 'Sprint conditioning II',
    description: 'This is a basic exercise for improving springing.',
    tags: [],
    exercisePackageId: '1',
    repetition: 2,
    actions: [
      {
        id: '1',
        type: ActionType.work,
        seconds: 15,
        image: '',
      },
      {
        id: '2',
        type: ActionType.work,
        seconds: 2,
        image: '',
      },
    ],
  },
];

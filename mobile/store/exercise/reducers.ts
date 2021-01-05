import { DEMO_WORKOUT } from '../../data/example';
import { Exercise } from '../../models/Exercise';
import { ExerciseState } from '../models';
import {
  ADD_EXERCISE,
  LOAD_EXERCISES,
  REMOVE_EXERCISE,
  REORDER_EXERCISE,
  UPDATE_EXERCISE,
  ExerciseActionTypes,
} from './actionTypes';

const initState: ExerciseState = {
  exercises: [],
};

const exerciseReducer = (
  state: ExerciseState = initState,
  action: ExerciseActionTypes
): ExerciseState => {
  switch (action.type) {
    case LOAD_EXERCISES:
      return _loadExercises(action.payload, state);
    case ADD_EXERCISE:
      return _addExercise(action.payload, state);
    case REMOVE_EXERCISE:
      return _removeExercise(action.payload, state);
    case UPDATE_EXERCISE:
      return _updateExercise(action.payload, state);
    case REORDER_EXERCISE:
      return _reorderExercise(action.payload, state);
    default:
      return state;
  }
};

export default exerciseReducer;

function _loadExercises(payload: { workoutId: string }, state: ExerciseState) {
  const workout = DEMO_WORKOUT.find((w) => w.id === payload.workoutId);
  return {
    ...state,
    exercises: workout ? workout.exercises : [],
  };
}

function _addExercise(
  payload: { order: number; exercise: Exercise },
  state: ExerciseState
) {
  const workout = DEMO_WORKOUT.find((w) => w.id === payload.exercise.workoutId);
  const exercises = workout ? workout.exercises : [];
  exercises.splice(payload.order, 0, payload.exercise);
  if (workout) {
    workout.exercises = exercises;
  }
  return {
    ...state,
    exercises: [...exercises],
  };
}

function _removeExercise(
  payload: { workoutId: string; exerciseId: string },
  state: ExerciseState
) {
  const workout = DEMO_WORKOUT.find((w) => w.id === payload.workoutId);
  const exercises = workout ? workout.exercises : [];
  const index = exercises.findIndex(
    (e) => e.workoutId === payload.workoutId && e.id === payload.exerciseId
  );
  if (workout) {
    workout.exercises = exercises;
  }
  if (index && index !== -1) {
    exercises.splice(index, 1);
    return {
      ...state,
      exercises: [...exercises],
    };
  }
  return state;
}

function _updateExercise(
  payload: { exercise: Exercise },
  state: ExerciseState
) {
  const workout = DEMO_WORKOUT.find((w) => w.id === payload.exercise.workoutId);
  const exercises = workout ? workout.exercises : [];
  const index = exercises.findIndex(
    (e) =>
      e.workoutId === payload.exercise.workoutId && e.id === payload.exercise.id
  );
  if (index && index !== -1) {
    exercises.splice(index, 1, payload.exercise);
    if (workout) {
      workout.exercises = exercises;
    }
    return {
      ...state,
      exercises: [...exercises],
    };
  }
  return state;
}

function _reorderExercise(
  payload: {
    workoutId: string;
    exerciseId: string;
    oldOrder: number;
    newOrder: number;
  },
  state: ExerciseState
) {
  const workout = DEMO_WORKOUT.find((w) => w.id === payload.workoutId);
  const exercises = workout ? workout.exercises : [];
  const index = exercises.findIndex(
    (e) => e.workoutId === payload.workoutId && e.id === payload.exerciseId
  );
  if (index && index !== -1) {
    exercises.splice(
      payload.newOrder,
      0,
      exercises.splice(payload.oldOrder, 1)[0]
    );
    if (workout) {
      workout.exercises = exercises;
    }
    return {
      ...state,
      exercises: [...exercises],
    };
  }
  return state;
}

import { ExerciseState } from '../models';
import {
  ADD_EXERCISE,
  LOAD_EXERCISES,
  REMOVE_EXERCISE,
  REORDER_EXERCISE,
  UPDATE_EXERCISE,
  ExerciseActionTypes,
  LoadExercisesAction,
  AddExerciseAction,
  RemoveExerciseAction,
  UpdateExerciseAction,
  ReorderExerciseAction,
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
      return _loadExercises(action, state);
    case ADD_EXERCISE:
      return _addExercise(action, state);
    case REMOVE_EXERCISE:
      return _removeExercise(action, state);
    case UPDATE_EXERCISE:
      return _updateExercise(action, state);
    case REORDER_EXERCISE:
      return _reorderExercise(action, state);
    default:
      return state;
  }
};

export default exerciseReducer;

function _loadExercises(action: LoadExercisesAction, state: ExerciseState) {
  return {
    ...state,
    exercises: [...action.payload.exercises],
  };
}

function _addExercise(action: AddExerciseAction, state: ExerciseState) {
  const exercises = state.exercises;
  exercises.splice(action.payload.order, 0, action.payload.exercise);
  return {
    ...state,
    exercises: [...exercises],
  };
}

function _removeExercise(action: RemoveExerciseAction, state: ExerciseState) {
  const exercises = state.exercises;
  const index = exercises.findIndex(
    (e) =>
      e.workoutId === action.payload.workoutId &&
      e.id === action.payload.exerciseId
  );
  if (index !== -1) {
    exercises.splice(index, 1);
    return {
      ...state,
      exercises: [...exercises],
    };
  }
  return state;
}

function _updateExercise(action: UpdateExerciseAction, state: ExerciseState) {
  const exercises = state.exercises;
  const index = exercises.findIndex(
    (e) =>
      e.workoutId === action.payload.exercise.workoutId &&
      e.id === action.payload.exercise.id
  );
  console.log('index:', index);
  if (index !== -1) {
    exercises.splice(index, 1, action.payload.exercise);
    return {
      ...state,
      exercises: [...exercises],
    };
  }
  return state;
}

function _reorderExercise(action: ReorderExerciseAction, state: ExerciseState) {
  const exercises = state.exercises;
  const index = exercises.findIndex(
    (e) =>
      e.workoutId === action.payload.workoutId &&
      e.id === action.payload.exerciseId
  );
  if (index !== -1) {
    exercises.splice(
      action.payload.newOrder,
      0,
      exercises.splice(action.payload.oldOrder, 1)[0]
    );
    return {
      ...state,
      exercises: [...exercises],
    };
  }
  return state;
}

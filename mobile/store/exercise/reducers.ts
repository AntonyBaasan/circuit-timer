import { DEMO_EXERCISE } from '../../data/example';
import { ExerciseState } from '../models';
import {
  CREATE_EXERCISE,
  DELETE_EXERCISE,
  ExerciseActionTypes,
  UPDATE_EXERCISE,
} from './actionTypes';

const initState: ExerciseState = {
  exercises: DEMO_EXERCISE,
};

const exerciseReducer = (
  state: ExerciseState = initState,
  action: ExerciseActionTypes
): ExerciseState => {
  switch (action.type) {
    case CREATE_EXERCISE:
      return {
        ...state,
        exercises: [...state.exercises, action.payload],
      };
    case UPDATE_EXERCISE:
      const index = state.exercises.findIndex(
        (e) => e.id === action.payload.id
      );
      const updatedExercise = Object.assign(
        {},
        state.exercises[index],
        action.payload
      );
      const updatedList = state.exercises.splice(index, 1, updatedExercise);
      return { ...state, exercises: updatedList };
    case DELETE_EXERCISE:
      const listWithRemovedItem = state.exercises.filter(
        (e) => e.id !== action.payload
      );
      return { ...state, exercises: listWithRemovedItem };
    default:
      return state;
  }
};

export default exerciseReducer;

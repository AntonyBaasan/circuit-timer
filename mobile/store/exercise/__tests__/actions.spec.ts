import 'react-native-get-random-values';
import { Exercise } from '../../../models/Exercise';
import * as actions from '../actions';
import {
  AddExerciseAction,
  ADD_EXERCISE,
  LoadExercisesAction,
  LOAD_EXERCISES,
  RemoveExerciseAction,
  REMOVE_EXERCISE,
  UpdateExerciseAction,
  UPDATE_EXERCISE,
} from '../actionTypes';

describe('exercise actions', () => {
  beforeEach(() => {});
  it('should load exercise: select from db and dispatch load exercises action', () => {
    const exercises = [{} as Exercise];
    const expectedAction: LoadExercisesAction = {
      type: LOAD_EXERCISES,
      payload: { exercises },
    };

    expect(actions.loadExercises('10')).toEqual(expectedAction);
  });
  it('should create add exercise action', () => {
    const exercise = {} as Exercise;
    const expectedAction: AddExerciseAction = {
      type: ADD_EXERCISE,
      payload: { order: 1, exercise },
    };

    expect(actions.addExercises(1, exercise)).toEqual(expectedAction);
  });
  it('should create remove exercise action', () => {
    const expectedAction: RemoveExerciseAction = {
      type: REMOVE_EXERCISE,
      payload: { workoutId: '1', exerciseId: '2' },
    };

    expect(actions.removeExercises('1', '2')).toEqual(expectedAction);
  });
  it('should create update exercise action', () => {
    const exercise = { id: '3' } as Exercise;
    const expectedAction: UpdateExerciseAction = {
      type: UPDATE_EXERCISE,
      payload: { exercise },
    };

    expect(actions.updateExercises(exercise)).toEqual(expectedAction);
  });
});

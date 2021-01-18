import { StatState } from '../models';
import {
  GET_STAT_BETWEEN,
  ADD_STAT,
  StatActionTypes,
  GetStatBetweenAction,
  AddStatAction,
} from './actionTypes';

const initState: StatState = {
  stat: {
    '20210118': {
      '1': {
        date: '20210118',
        workoutId: '1',
        done: 3,
        skipped: 1,
        count: 2,
      },
      '2': {
        date: '20210118',
        workoutId: '1',
        done: 7,
        skipped: 0,
        count: 7,
      },
    },
  },
};

const exerciseReducer = (
  state: StatState = initState,
  action: StatActionTypes
): StatState => {
  switch (action.type) {
    case GET_STAT_BETWEEN:
      return _getStatBetween(action, state);
    case ADD_STAT:
      return _addStat(action, state);
    default:
      return state;
  }
};

export default exerciseReducer;

function _getStatBetween(action: GetStatBetweenAction, state: StatState) {
  return {
    ...state,
  };
}

function _addStat(action: AddStatAction, state: StatState) {
  return {
    ...state,
  };
}

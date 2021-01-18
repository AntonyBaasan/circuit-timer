import { StatState } from '../models';
import {
  GET_STAT_BETWEEN,
  ADD_STAT,
  StatActionTypes,
  GetStatBetweenAction,
  AddStatAction,
} from './actionTypes';

const initState: StatState = {
  daily: {
    '20210118': {
      '1': {
        day: '20210118',
        workoutId: '1',
        done: 3,
        skipped: 1,
      },
      '2': {
        day: '20210118',
        workoutId: '1',
        done: 7,
        skipped: 0,
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
  const stat = action.payload.stat;
  const oldDayStat = state.daily[stat.day];
  const oldStat = oldDayStat
    ? oldDayStat[stat.workoutId]
    : { done: 0, skipped: 0 };

  const newStat = {
    day: stat.day,
    workoutId: stat.workoutId,
    done: oldStat.done + stat.done,
    skipped: oldStat.skipped + stat.skipped,
  };

  return {
    ...state,
    daily: {
      ...state.daily,
      [stat.day]: {
        ...state.daily[stat.day],
        [stat.workoutId]: newStat,
      },
    },
  };
}

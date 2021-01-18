import { Action } from 'redux';
import { Stat } from '../../models/Stat';

export const GET_STAT_BETWEEN = 'GET_STAT_BETWEEN';
export const ADD_STAT = 'ADD_STAT';

export interface GetStatBetweenAction extends Action {
  type: typeof GET_STAT_BETWEEN;
  payload: { exerciseId: string; startDay: string; endDay: string };
}

export interface AddStatAction extends Action {
  type: typeof ADD_STAT;
  payload: { stat: Stat };
}

export type StatActionTypes = GetStatBetweenAction | AddStatAction;

import * as ExerciseDB from '../../helpers/db/exercise';
import { Exercise } from '../../models/Exercise';
import { Stat } from '../../models/Stat';
import { GET_STAT_BETWEEN, ADD_STAT } from './actionTypes';

export const getStatBetween = (startDay: string, endDay: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: GET_STAT_BETWEEN, payload: { startDay, endDay } });
    } catch (error) {
      console.log(error);
    }
  };
};
export const addStatBetween = (stat: Stat, endDay: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: ADD_STAT, payload: { stat } });
    } catch (error) {
      console.log(error);
    }
  };
};

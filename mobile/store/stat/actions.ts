import { Stat } from '../../models/Stat';
import { LOAD_STAT_BETWEEN, SET_STAT } from './actionTypes';
import * as StatDB from '../../helpers/db/stat';
import { RootState } from '../models';

export const loadStatBetween = (startDay?: string, endDay?: string) => {
  return async (dispatch: any) => {
    try {
      const selected = await StatDB.selectStat(startDay, endDay);

      dispatch({ type: LOAD_STAT_BETWEEN, payload: selected });
    } catch (error) {
      console.log(error);
    }
  };
};
export const addStat = (addStat: Stat) => {
  return async (dispatch: any, getState: any) => {
    try {
      const state: RootState = getState(); // RootState
      const stat = state.stat;

      const oldDayStat = stat.daily[addStat.day];

      let oldStat = { done: 0, skipped: 0 };
      if (oldDayStat && oldDayStat[addStat.workoutId]) {
        oldStat = oldDayStat[addStat.workoutId];
      }

      const newStat = {
        day: addStat.day,
        workoutId: addStat.workoutId,
        done: oldStat.done + addStat.done,
        skipped: oldStat.skipped + addStat.skipped,
      };

      const insertResult = await StatDB.insertStat(addStat.day, {
        ...(oldDayStat ? oldDayStat : {}),
        [newStat.workoutId]: newStat,
      });

      dispatch({ type: SET_STAT, payload: { stat: newStat } });
    } catch (error) {
      console.log(error);
    }
  };
};

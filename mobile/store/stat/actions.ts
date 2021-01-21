import { Stat } from '../../models/Stat';
import { LOAD_STAT_BETWEEN, SET_STAT } from './actionTypes';
import * as StatDB from '../../helpers/db/stat';

export const loadStatBetween = (startDay: string, endDay: string) => {
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
      const { stat } = getState();

      const oldDayStat = stat.daily[addStat.day];
      const oldStat = oldDayStat
        ? oldDayStat[addStat.workoutId]
        : { done: 0, skipped: 0 };

      const newStat = {
        day: addStat.day,
        workoutId: addStat.workoutId,
        done: oldStat.done + addStat.done,
        skipped: oldStat.skipped + addStat.skipped,
      };

      const insertResult = await StatDB.insertStat(addStat.day, {
          [newStat.workoutId]: newStat,
      });

      dispatch({ type: SET_STAT, payload: { stat: newStat } });
    } catch (error) {
      console.log(error);
    }
  };
};

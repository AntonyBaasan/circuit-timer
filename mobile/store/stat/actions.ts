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

      let prevWorkoutStatOfDay: Stat[] = [addStat];
      if (oldDayStat && oldDayStat[addStat.workoutId]) {
        prevWorkoutStatOfDay = [...oldDayStat[addStat.workoutId], addStat];
      }

      const insertResult = await StatDB.insertStat(addStat.day, {
        ...(oldDayStat ? oldDayStat : {}),
        [addStat.workoutId]: prevWorkoutStatOfDay,
      });

      dispatch({
        type: SET_STAT,
        payload: {
          day: addStat.day,
          workoutId: addStat.workoutId,
          stat: prevWorkoutStatOfDay,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

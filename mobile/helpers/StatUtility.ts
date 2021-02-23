import { defaultStatView } from '../constants/DefaultValues';
import { DailyStat, StatView } from '../models/Stat';

export function calculateStatView(statsByDays: { [day: string]: DailyStat }): StatView {
  const statView: StatView = Object.assign({}, defaultStatView);
  if (statsByDays) {
    for (const [day, statsByWorkout] of Object.entries(statsByDays)) {
      for (const [workoutId, stats] of Object.entries(statsByWorkout)) {
        stats.forEach((s) => {
          statView.workout += 1;
          statView.exercise += s.done;
        });
      }
    }
  }
  return statView;
}

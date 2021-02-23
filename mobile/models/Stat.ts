export interface Stat {
  day: string;
  workoutId: string;
  done: number;
  skipped: number;
}

export interface DailyStat {
  [workoutId: string]: Stat[];
}

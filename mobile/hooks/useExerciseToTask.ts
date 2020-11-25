import { Platform } from 'react-native';
import { ExerciseType } from '../models/ExcerciseType';
import { Exercise } from '../models/Exercise';
import { ExerciseTask } from '../models/ExerciseTask';

export default function useExerciseToTask(exercises: Exercise[] | undefined) {
  let taskList: ExerciseTask[] = [];

  if (exercises) {
    // converts Exercise object to ExerciseTask object list based on the Sets property
    taskList = exercises.flatMap((e) =>
      [Array(e.sets).keys].map((i) => ({
        exerciseId: e.id,
        exerciseType: e.exerciseType,
        title: e.title,
        description: e.description,
        duration: e.duration,
        image: e.image,
        reps: e.reps,
      }))
    );
  }

  return taskList;
}

import 'react-native-get-random-values';
import { v4 as  uuidv4 } from 'uuid';
import { Exercise } from '../models/Exercise';
import { ExcerciseTaskStatus, ExerciseTask } from '../models/ExerciseTask';

export default function useMapExerciseToTask(exercises: Exercise[] | undefined) {
  let taskList: ExerciseTask[] = [];

  if (exercises) {
    // converts Exercise object to ExerciseTask object list based on the Sets property
    taskList = exercises.flatMap((e) =>
      Array.from(Array(e.sets).keys()).map((i) => ({
        id: uuidv4(),
        exerciseId: e.id,
        exerciseType: e.exerciseType,
        order: e.order,
        title: e.title,
        description: e.description,
        duration: e.duration,
        image: e.image,
        sets: e.sets,
        reps: e.reps,
        status: ExcerciseTaskStatus.NotStarted,
        images: e.images?? []
      }))
    );
  }

  return taskList;
}

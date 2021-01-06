import * as SQLite from 'expo-sqlite';
import { DEMO_WORKOUT } from '../../data/example';
import { DB_NAME, TABLE_EXERCISE, TABLE_WORKOUT } from './constants';
import * as WorkoutDB from './workout';
import * as ExerciseDB from './exercise';

const db = SQLite.openDatabase(DB_NAME);

export const dropAllTable = () => {
  db.transaction((tx) => {
    const query = `
        DROP TABLE IF EXISTS ${TABLE_WORKOUT};
        DROP TABLE IF EXISTS ${TABLE_EXERCISE};
      `;
    tx.executeSql(
      query,
      [],
      (_, result) => {
        console.log('successfully dropped:');
        console.log(result);
      },
      (_, err) => {
        console.log('error:');
        console.log(err);
        return false;
      }
    );
  });
};

export const clearWorkoutAndExercise = () => {
  db.transaction((tx) => {
    const query = `
        DELETE FROM ${TABLE_WORKOUT};
        DELETE FROM ${TABLE_EXERCISE};
      `;
    tx.executeSql(
      query,
      [],
      (_, result) => {
        console.log('successfully deleted:');
        console.log(result);
      },
      (_, err) => {
        console.log('error:');
        console.log(err);
        return false;
      }
    );
  });
};

export const insertTestWorkouts = async () => {
  console.log('Debug insertTestWorkouts:');
  for (const workout of DEMO_WORKOUT) {
    try {
      const insertWorkoutResult = await WorkoutDB.insertWorkout({
        id: workout.id,
        title: workout.title,
        description: workout.description,
        tags: workout.tags.join(','),
        authorId: workout.authorId,
        packageId: workout.packageId,
        image: workout.image,
      });
      console.log('insertWorkoutResult:');
      console.log(insertWorkoutResult);

      for (const exercise of workout.exercises) {
        const insertExerciseResult = ExerciseDB.insertExercise({
          id: exercise.id,
          workoutId: exercise.workoutId,
          exerciseType: exercise.exerciseType,
          order: exercise.order,
          title: exercise.title,
          description: exercise.description,
          sets: exercise.sets,
          duration: exercise.duration,
          hasRest: exercise.hasRest ? 1 : 0,
          restTime: exercise.restTime,
          reps: exercise.reps,
          weight: exercise.weight,
          distance: exercise.distance,
          image: exercise.id,
        });
        console.log('insertExerciseResult:');
        console.log(insertExerciseResult);
      }
    } catch (err) {
      console.log('err:');
      console.log(err);
    }
  }
};

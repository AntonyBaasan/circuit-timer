import * as SQLite from 'expo-sqlite';
import { Exercise } from '../../models/Exercise';
import { Workout } from '../../models/Workout';
import { DB_NAME, TABLE_EXERCISE, TABLE_WORKOUT } from './constants';

// opens or creates db
// this code will fired first time when this file is imported
const db = SQLite.openDatabase(DB_NAME);

export const insertWorkout = (workout: Workout, exercises: Exercise[]) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const insertWorkoutQuery = `
          INSERT into ${TABLE_WORKOUT}(id,title,description,tags,authorid,packageid,image) 
          values (?,?,?,?,?,?,?);
        `;
      const workoutParams = [
        workout.id,
        workout.title,
        workout.description,
        workout.tags,
        workout.authorId,
        workout.packageId,
        workout.image,
      ];
      let insertExercisesQuery = `
          INSERT into ${TABLE_EXERCISE} 
          (id,workoutId,exerciseType,order,title,description,sets,duration,hasRest,restTime,reps,distance,image) 
          values
          `;
      const exerciseParams: any[] = [];
      exercises.forEach((exercise) => {
        insertExercisesQuery += `
        (?,?,?,?,?,?,?,?,?,?,?,?,?)
        `;
        exerciseParams.push(
          exercise.id,
          exercise.workoutId,
          exercise.exerciseType,
          exercise.order,
          exercise.title,
          exercise.description,
          exercise.sets,
          exercise.duration,
          exercise.hasRest,
          exercise.restTime,
          exercise.reps,
          exercise.weight,
          exercise.distance,
          exercise.image
        );
      });
      insertExercisesQuery += ';';

      tx.executeSql(
        insertWorkoutQuery + insertExercisesQuery,
        [...workoutParams, ...exerciseParams],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
};
export const updateWorkout = (workout: Workout, exercises: Exercise[]) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const updateWorkoutQuery = `
            UPDATE ${TABLE_WORKOUT}
            SET id=?,title=?,description=?,tags=?,authorid=?,packageid=?,image=?;
          `;
      const workoutParams = [
        workout.id,
        workout.title,
        workout.description,
        workout.tags,
        workout.authorId,
        workout.packageId,
        workout.image,
      ];
      let updateExercisesQuery = '';
      const exerciseParams: any[] = [];
      exercises.forEach((exercise) => {
        updateExercisesQuery += `
          UPDATE ${TABLE_EXERCISE}
          SET id=?,workoutId=?,exerciseType=?,order=?,title=?,description=?,sets=?,duration=?,hasRest=?,restTime=?,reps=?,distance=?,image=?;
        `;
        exerciseParams.push(
          exercise.id,
          exercise.workoutId,
          exercise.exerciseType,
          exercise.order,
          exercise.title,
          exercise.description,
          exercise.sets,
          exercise.duration,
          exercise.hasRest,
          exercise.restTime,
          exercise.reps,
          exercise.weight,
          exercise.distance,
          exercise.image
        );
      });
      tx.executeSql(
        updateWorkoutQuery + updateExercisesQuery,
        [...workoutParams, ...exerciseParams],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
};

export const deleteWorkout = (id: string) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const query = `
            DELETE FROM ${TABLE_WORKOUT}
            WHERE id=?;
          `;
      tx.executeSql(
        query,
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
};

const mapResultSetsToWorkouts = (resultSet: SQLite.SQLResultSet): Workout[] => {
  const workouts: Workout[] = [];
  for (let index = 0; index < resultSet.rows.length; index += 1) {
    const element = resultSet.rows.item(index);
    workouts.push({
      id: element.id,
      title: element.title,
      description: element.description,
      tags: element.tags ? element.tags.split(',') : [],
      authorId: element.authorId,
      packageId: element.packageId,
      image: element.image,
    } as Workout);
  }
  return workouts;
};

export const selectWorkouts = () => {
  return new Promise<Workout[]>((resolve, reject) => {
    db.transaction((tx) => {
      const query = `
            select id,title,description,tags,authorid,packageid,image 
            from ${TABLE_WORKOUT};
          `;
      tx.executeSql(
        query,
        [],
        (_, result) => {
          resolve(mapResultSetsToWorkouts(result));
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
};

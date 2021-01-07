import * as SQLite from 'expo-sqlite';
import { DB_NAME, TABLE_EXERCISE, TABLE_WORKOUT } from './constants';

// opens or creates db
// this code will fired first time when this file is imported
const db = SQLite.openDatabase(DB_NAME);

export const insertExercise = (value: {
  id: string;
  workoutId: string;
  exerciseType: number;
  order: number;
  title: string;
  description?: string;
  sets: number;
  duration?: number;
  hasRest: number;
  restTime?: number;
  reps?: number;
  weight?: number;
  distance?: number;
  image: string;
}) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const query = `
          INSERT into ${TABLE_EXERCISE} 
          (id,workoutId,exerciseType,order,title,description,sets,duration,hasRest,restTime,reps,distance,image) 
          values 
          (?,?,?,?,?,?,?,?,?,?,?,?,?);
        `;
      tx.executeSql(
        query,
        [
          value.id,
          value.workoutId,
          value.exerciseType,
          value.order,
          value.title,
          value.description,
          value.sets,
          value.duration,
          value.hasRest,
          value.restTime,
          value.reps,
          value.weight,
          value.distance,
          value.image,
        ],
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
export const updateExercise = (value: {
  id: string;
  workoutId: string;
  exerciseType: number;
  order: number;
  title: string;
  description: string;
  sets: number;
  duration: number;
  hasRest: number;
  restTime: number;
  reps: number;
  weight: number;
  distance: number;
  image: string;
}) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const query = `
            UPDATE ${TABLE_EXERCISE}
            SET id=?,workoutId=?,exerciseType=?,order=?,title=?,description=?,sets=?,duration=?,hasRest=?,restTime=?,reps=?,distance=?,image=?;
          `;
      tx.executeSql(
        query,
        [
          value.id,
          value.workoutId,
          value.exerciseType,
          value.order,
          value.title,
          value.description,
          value.sets,
          value.duration,
          value.hasRest,
          value.restTime,
          value.reps,
          value.weight,
          value.distance,
          value.image,
        ],
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

export const updateExerciseField = (fieldName: string, value: any) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const query = `
            UPDATE ${TABLE_EXERCISE}
            SET ${fieldName}=?;
          `;
      tx.executeSql(
        query,
        [value],
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

export const deleteExercise = (id: string) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const query = `
            DELETE FROM ${TABLE_EXERCISE}
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

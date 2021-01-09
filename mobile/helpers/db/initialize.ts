import * as SQLite from 'expo-sqlite';
import { DB_NAME, TABLE_EXERCISE, TABLE_EXERCISE_PICTURES, TABLE_WORKOUT } from './constants';

// opens or creates db
// this code will fired first time when this file is imported
const db = SQLite.openDatabase(DB_NAME);

export const initialize = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        createWorkoutTableQuery,
        [],
        (_, result) => {
          console.log(TABLE_WORKOUT, 'table is created.')
        },
        (_, err) => {
          return true;
        }
      );
      tx.executeSql(
        createExerciseTableQuery,
        [],
        (_, result) => {
          console.log(TABLE_EXERCISE, 'table is created.')
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

const createWorkoutTableQuery = `
CREATE TABLE IF NOT EXISTS ${TABLE_WORKOUT} (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    tags TEXT,
    authorId TEXT,
    packageId TEXT,
    image TEXT
);
`;

const createExerciseTableQuery = `
        CREATE TABLE IF NOT EXISTS ${TABLE_EXERCISE} (
            id TEXT,
            workoutId TEXT NO NULL,
            exerciseType INTEGER NOT NULL,
            orderId INTEGER,
            title TEXT NOT NULL,
            description TEXT,
            sets INTEGER,
            duration INTEGER,
            hasRest INTEGER,
            restTime INTEGER,
            reps INTEGER,
            distance INTEGER,
            image TEXT,
            weight INTEGER,
            FOREIGN KEY(workoutId) REFERENCES ${TABLE_WORKOUT}(id) ON DELETE CASCADE
            UNIQUE(id, workoutId)
        );
      `;
      
const createExercisePictureTableQuery = `
CREATE TABLE IF NOT EXISTS ${TABLE_EXERCISE_PICTURES} (
    id TEXT PRIMARY KEY,
    exerciseId TEXT NO NULL,
    title TEXT NOT NULL,
    description TEXT,
    tags TEXT,
    authorId TEXT,
    packageId TEXT,
    base64 TEXT,
    FOREIGN KEY(workoutId) REFERENCES ${TABLE_WORKOUT}(id) ON DELETE CASCADE
    UNIQUE(id, workoutId)
);
`;
import * as SQLite from 'expo-sqlite';
import { DB_NAME, TABLE_EXERCISE, TABLE_WORKOUT } from './constants';

// opens or creates db
// this code will fired first time when this file is imported
const db = SQLite.openDatabase(DB_NAME);

export const initialize = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const query = `
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
      tx.executeSql(
        query,
        [],
        (_, result) => {
          console.log(TABLE_WORKOUT, 'table is created.')
        },
        (_, err) => {
          return true;
        }
      );
      const query2 = `
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
      tx.executeSql(
        query2,
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

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
            authorid TEXT,
            packageid TEXT,
            image TEXT
        );
        CREATE TABLE IF NOT EXISTS ${TABLE_EXERCISE} (
            id TEXT PRIMARY KEY,
            workoutId TEXT NO NULL,
            exerciseType INTEGER NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            sets INTEGER,
            duration INTEGER,
            hasRest INTEGER,
            restTime INTEGER,
            reps INTEGER,
            distance INTEGER,
            image TEXT,
            FOREIGN KEY(workoutId) REFERENCES ${TABLE_WORKOUT}(id) ON DELETE CASCADE
        )
      `;
      tx.executeSql(
        query,
        [],
        () => {
          resolve('success');
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
};

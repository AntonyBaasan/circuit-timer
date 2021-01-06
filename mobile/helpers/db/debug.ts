import * as SQLite from 'expo-sqlite';
import { DB_NAME, TABLE_EXERCISE, TABLE_WORKOUT } from './constants';

// opens or creates db
// this code will fired first time when this file is imported
const db = SQLite.openDatabase(DB_NAME);

export const dropAllTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const query = `
        DROP TABLE IF EXISTS ${TABLE_WORKOUT};
        DROP TABLE IF EXISTS ${TABLE_EXERCISE};
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

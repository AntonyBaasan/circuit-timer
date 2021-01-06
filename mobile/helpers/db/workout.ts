import * as SQLite from 'expo-sqlite';
import { DB_NAME, TABLE_WORKOUT } from './constants';

// opens or creates db
// this code will fired first time when this file is imported
const db = SQLite.openDatabase(DB_NAME);

export const insertWorkout = (value: {
  id: string;
  title: string;
  description: string;
  tags: string;
  authorId?: string;
  packageId?: string;
  image?: string;
}) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const query = `
          INSERT into ${TABLE_WORKOUT}(
              id,title,description,tags,authorid,packageid,image 
          ) values (
              ?,?,?,?,?,?,? 
          );
        `;
      tx.executeSql(
        query,
        [
          value.id,
          value.title,
          value.description,
          value.tags,
          value.authorId,
          value.packageId,
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
export const updateWorkout = (value: {
  id: string;
  title: string;
  description: string;
  tags: string;
  authorid: string;
  packageId: string;
  image: string;
}) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const query = `
            UPDATE ${TABLE_WORKOUT}
            SET 
                id=?,
                title=?,
                description=?,
                tags=?,
                authorid=?,
                packageid=?,
                image=?;
          `;
      tx.executeSql(
        query,
        [
          value.id,
          value.title,
          value.description,
          value.tags,
          value.authorid,
          value.packageId,
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

export const selectWorkouts = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const query = `
            select id,title,description,tags,authorid,packageid,image 
            from ${TABLE_WORKOUT};
          `;
      tx.executeSql(
        query,
        [],
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

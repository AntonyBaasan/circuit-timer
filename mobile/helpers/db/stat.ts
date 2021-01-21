import * as SQLite from 'expo-sqlite';
import { DailyStat, Stat } from '../../models/Stat';
import { Workout } from '../../models/Workout';
import {
  DB_NAME,
  STRING_JOIN_CHAR,
  TABLE_STAT,
  TABLE_WORKOUT,
} from './constants';

// opens or creates db
// this code will fired first time when this file is imported
const db = SQLite.openDatabase(DB_NAME);

export const insertStat = (day: string, dailyStat: DailyStat) => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      try {
        const query = `
          INSERT OR REPLACE INTO ${TABLE_STAT}
          (day, info) 
          values (?,?);`;
        const param = [day, JSON.stringify(dailyStat)];

        transaction.executeSql(
          query,
          param,
          (_, result) => {
            resolve(result);
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      } catch (error) {
        console.log('error2:');
        console.log(error);
      }
    });
  });
};
// export const updateWorkout = (workout: Workout) => {
//   return new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       const updateWorkoutQuery = `
//             UPDATE ${TABLE_WORKOUT}
//             SET title=?,description=?,tags=?,authorId=?,packageId=?,image=?
//             WHERE id=?;
//           `;
//       const workoutParams = [
//         workout.title,
//         workout.description,
//         workout.tags ? workout.tags.join(STRING_JOIN_CHAR) : null,
//         workout.authorId,
//         workout.packageId,
//         workout.image,
//         workout.id,
//       ];
//       tx.executeSql(
//         updateWorkoutQuery,
//         workoutParams,
//         (_, result) => {
//           resolve(result);
//         },
//         (_, err) => {
//           reject(err);
//           return false;
//         }
//       );
//     });
//   });
// };

// export const deleteWorkout = (id: string) => {
//   return new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       const query = `
//             DELETE FROM ${TABLE_WORKOUT}
//             WHERE id=?;
//           `;
//       tx.executeSql(
//         query,
//         [id],
//         (_, result) => {
//           resolve(result);
//         },
//         (_, err) => {
//           reject(err);
//           return false;
//         }
//       );
//     });
//   });
// };

export const selectStat = (startDay: string, endDay: string) => {
  return new Promise<{ [day: string]: DailyStat }>((resolve, reject) => {
    db.transaction((tx) => {
      const query = `
            select day, info
            from ${TABLE_STAT}
            where day>=? and day<=?;
          `;
      tx.executeSql(
        query,
        [startDay, endDay],
        (_, result) => {
          resolve(mapResultSetsToDailyStat(result));
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
};

const mapResultSetsToDailyStat = (
  resultSet: SQLite.SQLResultSet
): { [day: string]: DailyStat } => {
  const result: { [day: string]: DailyStat } = {};
  for (let index = 0; index < resultSet.rows.length; index += 1) {
    const row = resultSet.rows.item(index);
    result[row.day] = JSON.parse(row.info);
  }
  return result;
};

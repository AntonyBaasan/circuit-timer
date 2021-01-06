import * as SQLite from 'expo-sqlite';
import { DEMO_WORKOUT } from '../../data/example';
import { DB_NAME, TABLE_EXERCISE, TABLE_WORKOUT } from './constants';
import * as WorkoutDB from './workout';

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

export const insertTestWorkouts = async () => {
  console.log('Debug insertTestWorkouts:');
  for (const workout of DEMO_WORKOUT) {
    try {
      const result = await WorkoutDB.insertWorkout({
        id: workout.id,
        title: workout.title,
        description: workout.description,
        tags: workout.tags.join(','),
        authorId: workout.authorId,
        packageId: workout.packageId,
        image: workout.image,
      });
      console.log('result:');
      console.log(result);
    } catch (err) {
      console.log('err:');
      console.log(err);
    }
  }
};

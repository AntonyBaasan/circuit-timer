import * as SQLite from 'expo-sqlite';
import { Exercise, ExerciseMetadataStatus } from '../../models/Exercise';
import { DB_NAME, TABLE_EXERCISE, TABLE_WORKOUT } from './constants';

// opens or creates db
// this code will fired first time when this file is imported
const db = SQLite.openDatabase(DB_NAME);

export const selectExercises = (workoutId: string) => {
  return new Promise<Exercise[]>((resolve, reject) => {
    db.transaction((tx) => {
      const query = `
            select id,workoutId,exerciseType,orderId,title,description,sets,duration,hasRest,restTime,reps,distance,image
            from ${TABLE_EXERCISE}
            where workoutId=?;
          `;
      tx.executeSql(
        query,
        [workoutId],
        (_, result) => {
          resolve(mapResultSetsToExercises(result));
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
};

const mapResultSetsToExercises = (
  resultSet: SQLite.SQLResultSet
): Exercise[] => {
  const exercices: Exercise[] = [];
  for (let index = 0; index < resultSet.rows.length; index += 1) {
    const element = resultSet.rows.item(index);
    exercices.push({
      id: element.id,
      workoutId: element.workoutId,
      exerciseType: element.exerciseType,
      order: element.orderId,
      title: element.title,
      description: element.description,
      sets: element.sets,
      duration: element.duration,
      hasRest: element.hasRest === 1 ? true : false,
      restTime: element.restTime,
      reps: element.reps,
      weight: element.weight,
      distance: element.distance,
      imager: element.image ? element.image.split(',') : null,
      metadata: { status: ExerciseMetadataStatus.None },
    } as Exercise);
  }
  return exercices;
};

export const insertExercises = (exercise: Exercise) => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      try {
        let insertExercisesQuery = '';
        const exerciseParams: any[] = [];
        insertExercisesQuery = `
            INSERT into ${TABLE_EXERCISE} 
              (id,workoutId,exerciseType,orderId,title,description,sets,duration,hasRest,restTime,reps,weight,distance,image) 
            values
              (?,?,?,?,?,?,?,?,?,?,?,?,?,?);`;

        exerciseParams.push(
          exercise.id,
          exercise.workoutId,
          exercise.exerciseType,
          exercise.order,
          exercise.title,
          exercise.description,
          exercise.sets,
          exercise.duration,
          exercise.hasRest ? 1 : 0,
          exercise.restTime,
          exercise.reps,
          exercise.weight,
          exercise.distance,
          exercise.image ? exercise.image.join(',') : null
        );

        // console.log(insertExercisesQuery);
        // console.log(exerciseParams);
        transaction.executeSql(
          insertExercisesQuery,
          exerciseParams,
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

export const updateExercises = (exercise: Exercise) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const updateExercisesQuery = `
          UPDATE ${TABLE_EXERCISE}
          SET exerciseType=?,orderId=?,title=?,description=?,sets=?,duration=?,hasRest=?,restTime=?,reps=?,weight=?,distance=?,image=?
          WHERE id=? and workoutId=?;
        `;
      const exerciseParams = [
        exercise.exerciseType,
        exercise.order,
        exercise.title,
        exercise.description,
        exercise.sets,
        exercise.duration,
        exercise.hasRest ? 1 : 0,
        exercise.restTime,
        exercise.reps,
        exercise.weight,
        exercise.distance,
        exercise.image ? exercise.image.join(',') : null,
        exercise.id,
        exercise.workoutId,
      ];
      tx.executeSql(
        updateExercisesQuery,
        exerciseParams,
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
          return true;
        }
      );
    });
  });
};

export const deleteExercise = (exerciseId: string) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const query = `
            DELETE FROM ${TABLE_EXERCISE}
            WHERE id=?;
          `;
      tx.executeSql(
        query,
        [exerciseId],
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

// export const updateExerciseField = (fieldName: string, value: any) => {
//   return new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       const query = `
//             UPDATE ${TABLE_EXERCISE}
//             SET ${fieldName}=?;
//           `;
//       tx.executeSql(
//         query,
//         [value],
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

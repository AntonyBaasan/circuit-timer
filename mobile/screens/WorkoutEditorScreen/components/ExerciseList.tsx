import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { ScreenNames } from '../../../constants/Screen';
import { Exercise } from '../../../models/Exercise';
import { removeExercises } from '../../../store/exercise/actions';

type ExerciseListProps = {
  navigation: any;
  workoutId: string;
  exercises: Exercise[];
};

function ExerciseList(props: ExerciseListProps) {
  const { workoutId, exercises, navigation } = props;
  const dispatch = useDispatch();

  const clickAddExercise = (order: number) => {
    navigation.navigate(ScreenNames.ExerciseEditorScreen, {
      workoutId,
      order,
      exercise: null,
    });
  };

  const clickDeleteExercise = (exercise: Exercise) => {
    dispatch(removeExercises(workoutId, exercise.id));
  };

  const clickEditExercise = (exercise: Exercise, order: number) => {
    navigation.navigate(ScreenNames.ExerciseEditorScreen, {
      workoutId,
      order,
      exercise,
    });
  };

  const renderExerciseList = () => {
    return exercises.map((e, index) => {
      return (
        <View key={e.id} style={styles.listItem}>
          <Button
            style={styles.titleButton}
            onPress={() => clickEditExercise(e, index)}
          >
            {e.title}
          </Button>
          <Button
            style={styles.deleteButton}
            onPress={() => clickDeleteExercise(e)}
          >
            X
          </Button>
        </View>
      );
    });
  };
  const renderAddNewButton = (index: number) => {
    return (
      <View style={styles.listItem}>
        <Button
          style={styles.addButton}
          labelStyle={styles.addButtonLabel}
          onPress={() => clickAddExercise(index)}
        >
          +
        </Button>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderAddNewButton(0)}
      {renderExerciseList()}
      {exercises?.length > 0 && renderAddNewButton(exercises.length)}
    </View>
  );
}

export default ExerciseList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addButton: {
    borderWidth: 1,
    width: 50,
    borderColor: 'black',
    margin: 5,
  },
  addButtonLabel: {
    fontSize: 20,
  },
  titleButton: {
    width: 250,
    borderWidth: 1,
    borderColor: 'black',
    margin: 5,
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: 'red',
    margin: 5,
  },
});

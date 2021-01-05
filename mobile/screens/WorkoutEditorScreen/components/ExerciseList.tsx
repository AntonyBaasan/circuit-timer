import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { ScreenNames } from '../../../constants/Screen';
import { Exercise } from '../../../models/Exercise';

type ExerciseListProps = {
  navigation: any;
  workoutId: string;
  exercises: Exercise[];
  updated: (exercises: Exercise[]) => void;
};

function ExerciseList(props: ExerciseListProps) {
  const { workoutId, exercises, navigation } = props;
  useEffect(() => {});

  const clickAddExercise = (order: number) => {
    navigation.navigate(ScreenNames.ExerciseEditorScreen, {
      workoutId,
      order,
      exercise: null,
    });
  };

  const clickDeleteExercise = () => {};

  const clickEditExercise = (exercise: Exercise, order: number) => {
    navigation.navigate(ScreenNames.ExerciseEditorScreen, {
      workoutId,
      order,
      exercise,
    });
  };

  const renderExerciseList = () => {
    return exercises.map((e) => {
      return (
        <View key={e.id}>
          <Button onPress={() => clickEditExercise(e)}>{e.title}</Button>
        </View>
      );
    });
  };
  const renderBottomAddNewButton = () => {
    if (exercises?.length > 0) {
      return (
        <Button onPress={() => clickAddExercise(exercises.length)}>
          Add New
        </Button>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Button onPress={() => clickAddExercise(0)}>Add New</Button>
      {renderExerciseList()}
      {renderBottomAddNewButton()}
    </View>
  );
}

export default ExerciseList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

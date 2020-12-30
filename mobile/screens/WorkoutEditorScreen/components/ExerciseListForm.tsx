import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { ScreenNames } from '../../../constants/Screen';
import { Exercise } from '../../../models/Exercise';

type ExerciseListFormProps = {
  navigation: any;
  exercises: Exercise[];
};

function ExerciseListForm(props: ExerciseListFormProps) {
  const { exercises, navigation } = props;
  useEffect(() => {});

  const clickAddExercise = () => {
    navigation.navigate(ScreenNames.ActionEditorScreen, {
      exercise: null,
    });
  };

  const clickDeleteExercise = () => {};

  const clickEditExercise = (exercise: Exercise) => {
    navigation.navigate(ScreenNames.ActionEditorScreen, {
      exercise: exercise,
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

  return (
    <View style={styles.container}>
      <Button onPress={clickAddExercise}>Add New</Button>
      {renderExerciseList()}
      <Button onPress={clickAddExercise}>Add New</Button>
    </View>
  );
}

export default ExerciseListForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

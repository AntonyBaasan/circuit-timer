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
    navigation.navigate(ScreenNames.ActionEditorScreen);
  };

  const clickDeleteExercise = () => {};

  const clickEditExercise = () => {};

  const renderExerciseList = () => {
    return exercises.map((e) => {
      return (
        <View key={e.id}>
          <Button>{e.title}</Button>
          <Button onPress={clickAddExercise}>+</Button>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Button>+</Button>
      {renderExerciseList()}
    </View>
  );
}

export default ExerciseListForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

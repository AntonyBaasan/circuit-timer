import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { createDefaultExercise } from '../../constants/DefaultValues';
import { ExerciseType } from '../../models/ExcerciseType';

import { Exercise } from '../../models/Exercise';
import ExerciseEditorForm from './components/ExerciseEditorForm';

type ExerciseEditorScreenProps = {
  navigation: any;
  route: { params: { exercise?: Exercise } };
};

function ExerciseEditorScreen(props: ExerciseEditorScreenProps) {
  const { exercise } = props.route.params;

  let current: Exercise = exercise ?? createDefaultExercise();
  const [isNew, setIsNew] = useState(exercise == null);

  useEffect(() => {
    console.log('ExerciseEditorScreen useEffect exercise:', exercise);
    setIsNew(exercise == null);
    current = exercise ?? createDefaultExercise();
  }, [exercise]);

  const onExerciseSave = (exercise: Exercise) => {
    console.log(exercise);
    props.navigation.pop();
  };

  return (
    <View style={styles.container}>
      <ExerciseEditorForm
        exercise={current}
        isNew={isNew}
        save={onExerciseSave}
      />
    </View>
  );
}

export default ExerciseEditorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
  },
});

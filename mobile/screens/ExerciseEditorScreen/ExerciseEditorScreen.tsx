import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { createDefaultExercise } from '../../constants/DefaultValues';

import { Exercise } from '../../models/Exercise';
import ExerciseEditorForm from './components/ExerciseEditorForm';

type ExerciseEditorScreenProps = {
  navigation: any;
  route: { params: { workoutId: string, exercise?: Exercise } };
};

function ExerciseEditorScreen(props: ExerciseEditorScreenProps) {
  const { workoutId, exercise } = props.route.params;

  let current: Exercise = exercise ?? createDefaultExercise(workoutId);
  const [isNew, setIsNew] = useState(exercise == null);

  useEffect(() => {
    console.log('ExerciseEditorScreen useEffect exercise:', exercise);
    setIsNew(exercise == null);
    current = exercise ?? createDefaultExercise(workoutId);
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

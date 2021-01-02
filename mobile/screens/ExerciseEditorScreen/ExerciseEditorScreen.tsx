import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ExerciseType } from '../../models/ExcerciseType';

import { Exercise } from '../../models/Exercise';
import ExerciseEditorForm from './components/ExerciseEditorForm';

type ExerciseEditorScreenProps = {
  navigation: any;
  route: { params: { exercise?: Exercise } };
};

function ExerciseEditorScreen(props: ExerciseEditorScreenProps) {
  const { exercise } = props.route.params;

  const [isNew, setIsNew] = useState(exercise == null);

  useEffect(() => {
    console.log('ExerciseEditorScreen useEffect exercise:', exercise);
    setIsNew(exercise == null);
    if (exercise == null) {
      current = createDefaultExercise();
    } else {
      current = exercise;
    }
  }, [exercise]);

  const createDefaultExercise = (): Exercise => ({
    id: 'new id',
    exerciseType: ExerciseType.Reps,
    title: '',
    description: '',
    sets: 3,
    reps: 8,
    hasRest: true,
    restTime: 30,
  });

  let current: Exercise = createDefaultExercise();

  return (
    <View style={styles.container}>
      <ExerciseEditorForm exercise={current} isNew={isNew} />
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

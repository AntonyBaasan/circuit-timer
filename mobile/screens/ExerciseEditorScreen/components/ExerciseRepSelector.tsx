import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Text } from 'react-native-elements';

import { Exercise } from '../../../models/Exercise';

type ExerciseRepSelectorProps = {
  exercise: Exercise;
};

function ExerciseRepSelector(props: ExerciseRepSelectorProps) {
  const { exercise } = props;

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <Text>ExerciseRepSelector</Text>
      <View>
        <Text>Sets</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          placeholder="Sets"
          keyboardType="number-pad"
          value={exercise.sets.toString()}
        />
        <Text>Repetition</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          placeholder="Reps"
          keyboardType="number-pad"
          value={exercise.reps?.toString()}
        />
        <Text>Weight</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          placeholder="Weight"
          keyboardType="number-pad"
          value={exercise.weight?.toString()}
        />
      </View>
    </View>
  );
}

export default ExerciseRepSelector;

const styles = StyleSheet.create({
  container: {},
});

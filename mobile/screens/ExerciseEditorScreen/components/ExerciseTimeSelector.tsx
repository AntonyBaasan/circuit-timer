import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { ExerciseType } from '../../../models/ExcerciseType';

import { Exercise } from '../../../models/Exercise';

type ExerciseTimeSelectorProps = {};

function ExerciseTimeSelector(props: ExerciseTimeSelectorProps) {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <Text>ExerciseTimeSelector</Text>
    </View>
  );
}

export default ExerciseTimeSelector;

const styles = StyleSheet.create({
  container: {
  },
});

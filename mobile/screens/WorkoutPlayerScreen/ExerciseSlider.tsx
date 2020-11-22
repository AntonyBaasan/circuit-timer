import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeProvider, Button, Icon, Text } from 'react-native-elements';

import { View } from '../../components/Themed';
import { mainTheme } from '../../constants/theme/Main';
import { Workout } from '../../models/Workout';
import ExerciseControlPanel from './ExerciseControlPanel';

type ExerciseSliderProps = {
  workout: Workout | undefined;
};

function ExerciseSlider(props: ExerciseSliderProps) {
  const { workout } = props;
  const [currentExercise, setCurrentExercise] = useState(workout?.exercises[0]);

  useEffect(() => {});

  return (
    <ThemeProvider theme={mainTheme}>
      <View style={styles.container}>
        <Text>CurrentExercise: {currentExercise?.title}</Text>

        {workout?.exercises.map((e) => (
          <Text key={e.id}>{e.title}</Text>
        ))}
      </View>
      <ExerciseControlPanel
        exercise={currentExercise}
        onExerciseTable={() => {
          console.log('clicked');
        }}
      />
    </ThemeProvider>
  );
}

export default ExerciseSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

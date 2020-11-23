import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';

import { Text } from '../../components/Themed';
import { mainTheme } from '../../constants/theme/Main';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/models';
import ExerciseSlider from './components/ExerciseSlider';
import ExerciseControlPanel from './components/ExerciseControlPanel';
import { Exercise } from '../../models/Exercise';

type TimerProps = {
  route: { params: { workoutId: string } };
  navigation: any;
};
function WorkoutPlayerScreen(props: TimerProps) {
  const { workoutId } = props.route.params;

  const workout = useSelector((state: RootState) =>
    state.workout.workouts.find((w) => w.id === workoutId)
  );

  const [exerciseIndex, setExerciseIndex] = useState(0);

  useEffect(() => {}, [workout]);

  const showExerciseTable = () => {
    console.log('showExerciseTable');
    alert('antony');
  };
  const doneExercise = () => {
    console.log('doneExercise');
    goToNext();
  };
  const pauseExercise = () => {
    console.log('pauseExercise');
  };
  const skipExercise = () => {
    console.log('skipExercise');
    goToNext();
  };
  const getCurrentExercise = (): Exercise | undefined => {
    return workout?.exercises[exerciseIndex];
  };
  const goToNext = () => {
    if (workout && exerciseIndex < workout.exercises.length) {
      setExerciseIndex(exerciseIndex + 1);
    }
  };
  const isDone = () => {
    if (!workout) {
      return true;
    }
    return exerciseIndex >= workout.exercises.length;
  };

  return (
    <ThemeProvider theme={mainTheme}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>
            Playing: {workout?.title} (index: {exerciseIndex})
          </Text>
          <ExerciseSlider
            exercises={workout?.exercises}
            currentExerciseIndex={exerciseIndex}
            isDone={isDone()}
          />
          <View style={styles.controlPanelRow}>
            <ExerciseControlPanel
              exercise={getCurrentExercise()}
              onExerciseTable={showExerciseTable}
              onDone={doneExercise}
              onPause={pauseExercise}
              onSkipForward={skipExercise}
              isDone={isDone()}
            />
          </View>
        </SafeAreaView>
    </ThemeProvider>
  );
}
export default WorkoutPlayerScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignContent: 'space-between',
    // backgroundColor: 'blue'
  },
  scroll: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  controlPanelRow: {
    marginBottom: 50,// Important! without this margin controlpanel row goes down to tab bar (and become not clickable)
  },
});

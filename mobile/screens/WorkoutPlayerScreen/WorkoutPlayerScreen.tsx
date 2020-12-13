import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';

import { Text } from '../../components/Themed';
import { mainTheme } from '../../constants/theme/Main';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/models';
import ExerciseSlider from './components/ExerciseSlider';
import ExerciseControlPanel from './components/ExerciseControlPanel';
import useExerciseToTask from '../../hooks/useExerciseToTask';
import { ExerciseTask } from '../../models/ExerciseTask';

type TimerProps = {
  route: { params: { workoutId: string } };
  navigation: any;
};
function WorkoutPlayerScreen(props: TimerProps) {
  const { workoutId } = props.route.params;

  const workout = useSelector((state: RootState) =>
    state.workout.workouts.find((w) => w.id === workoutId)
  );

  const taskList = useExerciseToTask(workout?.exercises);

  const [taskIndex, setTaskIndex] = useState(0);

  useEffect(() => {}, [workout]);

  const showExerciseTable = () => {
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
  const getCurrentExercise = (): ExerciseTask | undefined => {
    return taskList[taskIndex];
  };
  const goToNext = () => {
    if (workout && taskIndex < taskList.length) {
      setTaskIndex(taskIndex + 1);
    }
  };
  const isDone = () => {
    if (!workout) {
      return true;
    }
    return taskIndex >= taskList.length;
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <SafeAreaView style={styles.container}>
        <View style={styles.slider}>
          <Text style={styles.title}>
            Playing: {workout?.title} (index: {taskIndex})
          </Text>
          <ExerciseSlider
            taskList={taskList}
            currentExerciseIndex={taskIndex}
            isDone={isDone()}
          />
        </View>
        <View style={styles.controlPanelRow}>
          <ExerciseControlPanel
            task={getCurrentExercise()}
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
    justifyContent: 'flex-start',
    // backgroundColor: 'blue'
  },
  slider:{
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  controlPanelRow: {
    height: 100,
  },
});

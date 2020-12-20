import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Dimensions } from 'react-native';
import { ThemeProvider, Overlay } from 'react-native-elements';

import { Text } from '../../components/Themed';
import { mainTheme } from '../../constants/theme/Main';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/models';
import ExerciseSlider from './components/ExerciseSlider';
import ExerciseControlPanel from './components/ExerciseControlPanel';
import useExerciseToTask from '../../hooks/useExerciseToTask';
import { ExcerciseTaskStatus, ExerciseTask } from '../../models/ExerciseTask';
import ExerciseTaskTable from './components/ExerciseTaskTable';

type TimerProps = {
  route: { params: { workoutId: string } };
  navigation: any;
};
function WorkoutPlayerScreen({ route, navigation }: TimerProps) {
  const { workoutId } = route.params;

  const workout = useSelector((state: RootState) =>
    state.workout.workouts.find((w) => w.id === workoutId)
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: workout?.title,
    });
  }, [navigation, workout]);

  const [taskList, setTaskList] = useState(
    useExerciseToTask(workout?.exercises)
  );
  const [taskIndex, setTaskIndex] = useState(0);
  const [currentTask, setCurrentTask] = useState(taskList[0]);
  const [isTaskTableVisible, setTaskTableVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    console.log('useEffect [taskIndex changed]:', taskIndex);
    taskList[taskIndex].status = ExcerciseTaskStatus.InProgress;
    setCurrentTask(taskList[taskIndex]);
    // update child components
    setTaskList([...taskList]);
  }, [taskIndex]);

  const showExerciseTable = () => {
    setTaskTableVisible(!isTaskTableVisible);
  };
  const doneExercise = () => {
    console.log('doneExercise');
    currentTask.status = ExcerciseTaskStatus.Done;
    goToNext();
  };
  const togglePauseExercise = () => {
    console.log('togglePauseExercise');
    setIsPaused(!isPaused);
  };
  const skipExercise = () => {
    console.log('skipExercise');
    currentTask.status = ExcerciseTaskStatus.Skipped;
    goToNext();
  };
  const getCurrentExercise = (): ExerciseTask | undefined => {
    return taskList[taskIndex];
  };
  const goToNext = () => {
    if (workout && taskIndex < taskList.length - 1) {
      setTaskIndex((prevTaskIndex) => prevTaskIndex + 1);
      return;
    }
    setIsDone(true);
  };

  //#region Render methods
  const renderTaskTable = () => {
    return (
      <View style={styles.overlayTaskTable}>
        <Overlay
          isVisible={isTaskTableVisible}
          onBackdropPress={showExerciseTable}
        >
          <ExerciseTaskTable
            tasks={taskList}
            close={showExerciseTable}
            currentTaskIndex={taskIndex}
          />
        </Overlay>
      </View>
    );
  };
  //#endregion

  return (
    <ThemeProvider theme={mainTheme}>
      <SafeAreaView style={styles.container}>
        {renderTaskTable()}
        <View style={styles.slider}>
          <Text style={styles.title}>
            (taskIndex: {taskIndex}) isDone: {isDone ? 'true' : 'false'}
          </Text>
          <Text style={styles.title}>CurrentTaskId:{currentTask.id}</Text>
          <ExerciseSlider
            taskList={taskList}
            currentExerciseIndex={taskIndex}
            isDone={isDone}
            done={doneExercise}
          />
        </View>
        <View style={styles.controlPanelRow}>
          <ExerciseControlPanel
            task={getCurrentExercise()}
            onExerciseTable={showExerciseTable}
            onDone={doneExercise}
            onPause={togglePauseExercise}
            onSkipForward={skipExercise}
            isDone={isDone}
            isPaused={isPaused}
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
  },
  slider: {
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  controlPanelRow: {
    height: 100,
  },
  overlayTaskTable: {
    // flex: 1,
    // width: screenWidth ,
    // backgroundColor: 'red',
  },
});

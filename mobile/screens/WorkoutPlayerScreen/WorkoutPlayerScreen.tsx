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
import { ExerciseType } from '../../models/ExcerciseType';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

type TimerProps = {
  route: { params: { workoutId: string } };
  navigation: any;
};
function WorkoutPlayerScreen({ route, navigation }: TimerProps) {
  const { workoutId } = route.params;
  let interval: NodeJS.Timeout;

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
  const [secondsLeft, setSecondsLeft] = useState(-1);

  // useEffect(() => {
  //   console.log('useEffect');
  //   return () => console.log('unmounting...');
  // });
  useEffect(() => {
    console.log('useEffect [taskIndex changed]:', taskIndex);
    if (interval) {
      clearInterval(interval);
    }
    taskList[taskIndex].status = ExcerciseTaskStatus.InProgress;
    setCurrentTask(taskList[taskIndex]);
    // update child components
    setTaskList([...taskList]);
    if (isTimerNeeded(taskList[taskIndex])) {
      setSecondsLeft(taskList[taskIndex].duration ?? 0);
      interval = setInterval(() => {
        setSecondsLeft((prevSecondsLeft) => {
          console.log('Timer:', prevSecondsLeft);
          return prevSecondsLeft - 1;
        });
      }, 1000);
    }
    return () => {
      console.log('Timer cleared');
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [taskIndex]);

  useEffect(() => {
    console.log('useEffect [secondsLeft]:', secondsLeft);
    if (secondsLeft === 0) {
      if (interval) {
        clearInterval(interval);
      }
      doneExercise();
    }
  }, [secondsLeft]);

  const isTimerNeeded = (task: ExerciseTask) => {
    return (
      task.exerciseType === ExerciseType.Cardio ||
      task.exerciseType === ExerciseType.Rest
    );
  };

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
            secondsLeft={secondsLeft}
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

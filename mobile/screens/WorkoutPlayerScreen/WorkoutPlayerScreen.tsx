import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { ThemeProvider, Overlay } from 'react-native-elements';

import { Text } from '../../components/Themed';
import { mainTheme } from '../../constants/theme/Main';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/models';
import ExerciseSlider from './components/ExerciseSlider';
import ExerciseControlPanel from './components/ExerciseControlPanel';
import useExerciseToTask from '../../hooks/useExerciseToTask';
import { ExcerciseTaskStatus, ExerciseTask } from '../../models/ExerciseTask';
import ExerciseTaskTable from './components/ExerciseTaskTable';
import { loadExercises } from '../../store/exercise/actions';

type TimerProps = {
  navigation: any;
  route: { params: { workoutId: string } };
};
function WorkoutPlayerScreen({ route, navigation }: TimerProps) {
  const { workoutId } = route.params;

  const dispatch = useDispatch();
  const workout = useSelector((state: RootState) =>
    state.workout.workouts.find((w) => w.id === workoutId)
  );
  const exercises = useSelector((state: RootState) => state.exercise.exercises);

  useEffect(() => {
    dispatch(loadExercises(workoutId));
  }, []);

  useEffect(() => {
    console.log(exercises);
    setTaskList(useExerciseToTask(exercises ?? []));
    setTaskIndex(0);
  }, [exercises]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: workout?.title,
    });
  }, [navigation, workout]);

  const [taskList, setTaskList] = useState(useExerciseToTask(exercises ?? []));
  const [taskIndex, setTaskIndex] = useState(0);
  const [currentTask, setCurrentTask] = useState<ExerciseTask>();
  const [isTaskTableVisible, setTaskTableVisible] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isPaused, setIsPause] = useState(false);

  useEffect(() => {
    console.log('useEffect [taskIndex changed]:', taskIndex);
    console.log('taskList.length:', taskList.length);
    if (taskList.length === 0) {
      return;
    }
    taskList[taskIndex].status = ExcerciseTaskStatus.InProgress;
    setCurrentTask(taskList[taskIndex]);
    // update child components
    // setTaskList([...taskList]);
  }, [taskIndex, taskList]);

  const showExerciseTable = () => {
    setTaskTableVisible(!isTaskTableVisible);
  };
  const doneExercise = () => {
    if (!currentTask) {
      return;
    }
    currentTask.status = ExcerciseTaskStatus.Done;
    goToNext();
  };
  const togglePauseExercise = () => {
    if (!currentTask) {
      return;
    }
    const newPausedState = !isPaused;
    setIsPause(newPausedState);
    currentTask.status = newPausedState
      ? ExcerciseTaskStatus.Paused
      : ExcerciseTaskStatus.InProgress;
  };
  const skipExercise = () => {
    if (!currentTask) {
      return;
    }
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
        {taskList.length === 0 && (
          <View style={styles.content}>
            <Text>Loading...</Text>
          </View>
        )}
        {taskList.length > 0 && currentTask && (
          <View style={styles.content}>
            {renderTaskTable()}
            <View style={styles.slider}>
              <Text style={styles.title}>
                (taskIndex: {taskIndex}) isDone: {isDone ? 'true' : 'false'}
              </Text>
              <Text style={styles.title}>
                CurrentTaskId:{currentTask?.title}
              </Text>
              <ExerciseSlider
                taskList={taskList}
                currentExerciseIndex={taskIndex}
                isDone={isDone}
                taskDone={doneExercise}
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
          </View>
        )}
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
  content: {
    flexGrow: 1,
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

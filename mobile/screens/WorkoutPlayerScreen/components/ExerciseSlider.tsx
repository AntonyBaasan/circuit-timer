import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExerciseTask } from '../../../models/ExerciseTask';
import SlideItem from './SlideItem';

type ExerciseSliderProps = {
  taskList: ExerciseTask[];
  currentExerciseIndex: number;
  isDone: boolean;
  taskDone: () => void;
  secondsBeforeDone: number;
  notificationBeforeDone: () => void;
};

function ExerciseSlider(props: ExerciseSliderProps) {
  const {
    taskList,
    currentExerciseIndex,
    taskDone,
    secondsBeforeDone,
    notificationBeforeDone,
  } = props;

  return (
    <ScrollView style={styles.container}>
      <SlideItem
        task={taskList[currentExerciseIndex]}
        taskDone={taskDone}
        secondsBeforeDone={secondsBeforeDone}
        notificationBeforeDone={notificationBeforeDone}
      />
    </ScrollView>
  );
}

export default ExerciseSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: 'orange',
  },
  sliderList: {},
});

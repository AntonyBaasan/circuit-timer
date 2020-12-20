import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExerciseTask } from '../../../models/ExerciseTask';
import SlideItem from './SlideItem';

type ExerciseSliderProps = {
  taskList: ExerciseTask[];
  currentExerciseIndex: number;
  isDone: boolean;
  taskDone: () => void;
};

function ExerciseSlider(props: ExerciseSliderProps) {
  const { taskList, currentExerciseIndex, taskDone } = props;

  return (
    <ScrollView style={styles.container}>
      <SlideItem task={taskList[currentExerciseIndex]} taskDone={taskDone} />
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

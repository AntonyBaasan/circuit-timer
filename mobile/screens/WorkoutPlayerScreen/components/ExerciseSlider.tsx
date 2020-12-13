import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { ExerciseTask } from '../../../models/ExerciseTask';
import SlideItem from './SlideItem';

type ExerciseSliderProps = {
  taskList?: ExerciseTask[];
  currentExerciseIndex: number;
  isDone: boolean;
};

function ExerciseSlider(props: ExerciseSliderProps) {
  const { taskList, currentExerciseIndex } = props;

  const flatListRef: any = useRef(null);

  const getCurrentExercise = () => {
    if (taskList !== undefined) {
      return taskList[currentExerciseIndex];
    }
  };

  const slideItemRender = ({ item }: { item: ExerciseTask }) => {
    return <SlideItem task={item} />;
  };

  useEffect(() => {
    flatListRef?.current.scrollToIndex({
      index: currentExerciseIndex,
      animated: true,
    });
  }, [currentExerciseIndex]);

  return (
    <ScrollView style={styles.container}>
      <FlatList
        ref={flatListRef}
        style={styles.sliderList}
        horizontal={true}
        data={taskList}
        renderItem={slideItemRender}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
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

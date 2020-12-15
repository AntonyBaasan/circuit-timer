import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { ExerciseTask } from '../../../models/ExerciseTask';
import SlideItem from './SlideItem';

type ExerciseSliderProps = {
  taskList: ExerciseTask[];
  currentExerciseIndex: number;
  isDone: boolean;
  secondsLeft: number;
};

function ExerciseSlider(props: ExerciseSliderProps) {
  const { taskList, currentExerciseIndex, secondsLeft } = props;

  const flatListRef: any = useRef(null);

  const slideItemRender = ({ item }: { item: ExerciseTask }) => {
    return <SlideItem task={item} currentTime={secondsLeft} />;
  };

  useEffect(() => {
    if (currentExerciseIndex < taskList.length) {
      console.log('scrollToIndex', currentExerciseIndex);
      flatListRef?.current.scrollToIndex({
        index: currentExerciseIndex,
        animated: true,
      });
    }
  }, [currentExerciseIndex]);

  return (
    <ScrollView style={styles.container}>
      <FlatList
        ref={flatListRef}
        horizontal={true}
        style={styles.sliderList}
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

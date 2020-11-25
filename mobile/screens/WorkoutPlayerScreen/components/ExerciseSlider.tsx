import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { ThemeProvider, Text } from 'react-native-elements';
import { ExerciseTask } from '../../../models/ExerciseTask';
import SlideItem from './SlideItem';

type ExerciseSliderProps = {
  taskList?: ExerciseTask[];
  currentExerciseIndex: number;
  isDone: boolean;
};

function ExerciseSlider(props: ExerciseSliderProps) {
  const { taskList, currentExerciseIndex } = props;

  const getCurrentExercise = () => {
    if (taskList !== undefined) {
      return taskList[currentExerciseIndex];
    }
  };

  const slideItemRender = ({ item }: { item: ExerciseTask }) => {
    return <SlideItem task={item} />;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>CurrentExercise: {getCurrentExercise()?.title}</Text>
        <FlatList
          horizontal={true}
          data={taskList}
          renderItem={slideItemRender}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ScrollView>
  );
}

export default ExerciseSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

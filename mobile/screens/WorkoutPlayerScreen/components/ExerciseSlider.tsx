import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { ThemeProvider, Text } from 'react-native-elements';

import { Exercise } from '../../../models/Exercise';
import SlideItem from './SlideItem';

type ExerciseSliderProps = {
  exercises?: Exercise[];
  currentExerciseIndex: number;
  isDone: boolean;
};

function ExerciseSlider(props: ExerciseSliderProps) {
  const { exercises, currentExerciseIndex } = props;

  const getCurrentExercise = () => {
    if (exercises !== undefined) {
      return exercises[currentExerciseIndex];
    }
  };

  const slideItemRender = ({ item }: { item: Exercise }) => {
    return <SlideItem exercise={item} />;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>CurrentExercise: {getCurrentExercise()?.title}</Text>
        <FlatList
          horizontal={true}
          data={exercises}
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

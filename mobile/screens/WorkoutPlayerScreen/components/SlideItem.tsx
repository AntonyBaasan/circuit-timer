import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { ThemeProvider, Button, Icon, Text } from 'react-native-elements';
import { ExerciseTask } from '../../../models/ExerciseTask';

type SlideItemProps = { 
  task: ExerciseTask;
  currentTime?: number;
};

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

function SlideItem(props: SlideItemProps) {
  const { task, currentTime } = props;
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Text>{task.title}</Text>
      </View>
      <View style={styles.metadata}>
        <Text>{task.title}</Text>
        <Text>Duration: {currentTime}/{task.duration}</Text>
        <Text>Repetition: {task.reps}</Text>
      </View>
    </View>
  );
}

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: screenHeight,
    width: screenWidth,
    backgroundColor: 'grey',
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  image: {
    backgroundColor: 'red',
  },
  metadata: {
    fontSize: 45,
    // height: 50,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
});

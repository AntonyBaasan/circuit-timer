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
        <Text>image</Text>
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
    height: screenHeight-250,
    // height: '100%',
    // height: 200,
    width: screenWidth,
    backgroundColor: 'grey',
    padding: 10,
    alignItems: 'stretch',
  },
  image: {
    flexGrow: 1,
    backgroundColor: 'red',
  },
  metadata: {
    flexGrow: 1,
    fontSize: 45,
    // height: 50,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
});

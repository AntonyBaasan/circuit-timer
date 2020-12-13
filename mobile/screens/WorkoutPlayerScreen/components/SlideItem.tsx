import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { ThemeProvider, Button, Icon, Text } from 'react-native-elements';
import { ExerciseType } from '../../../models/ExcerciseType';
import { ExerciseTask } from '../../../models/ExerciseTask';

type SlideItemProps = {
  task: ExerciseTask;
  currentTime?: number;
};

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

function SlideItem(props: SlideItemProps) {
  const { task, currentTime } = props;

  const renderMeansure = () => {
    if (
      task.exerciseType === ExerciseType.Cardio ||
      task.exerciseType === ExerciseType.Rest
    ) {
      return (
        <View style={styles.measure}>
          <Text>
            Duration: {currentTime}/{task.duration}
          </Text>
        </View>
      );
    }
    if (task.exerciseType === ExerciseType.Reps) {
      return (
        <View style={styles.measure}>
          <Text>Repetition: {task.reps}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.image}>{renderMeansure()}</View>
      <View style={styles.metadata}>
        <Text>{task.title}</Text>
        <Text>{task.description}</Text>
      </View>
    </View>
  );
}

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: screenHeight - 250,
    // height: '100%',
    // height: 200,
    width: screenWidth,
    backgroundColor: 'grey',
    padding: 10,
    alignItems: 'stretch',
  },
  image: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  measure: {
    backgroundColor: 'pink',
    height: 100,
    width: 100,
  },
  metadata: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    flexGrow: 1,
    fontSize: 45,
    height: 150,
    width: 200,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
});

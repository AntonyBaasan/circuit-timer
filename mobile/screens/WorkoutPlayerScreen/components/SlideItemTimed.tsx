import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import useInterval from '../../../hooks/useInterval';
import { ExerciseTask } from '../../../models/ExerciseTask';

type SlideItemProps = {
  task: ExerciseTask;
  done: () => void;
};

function SlideItemTimed(props: SlideItemProps) {
  console.log('SlideItemTimed created');
  const { task, done } = props;

  const [isFinished, setIsFinished] = useState(true);
  const [currentTime, setCurrentTime] = useState(task.duration ?? 0);

  useEffect(() => {
    console.log('SlideItemTimed task changed:', task.title);
    setIsFinished(false);
    setCurrentTime(task.duration ?? 0);
  }, [task]);

  useInterval(() => {
    if (isFinished) {
      console.log('SlideItemTimed isFinished=', isFinished);
      return;
    }
    setCurrentTime(currentTime - 1);
    if (currentTime <= 0) {
      setIsFinished(true);
      done();
    }
  }, 1000);

  return (
    <View style={styles.measure}>
      <Text>
        Duration: {currentTime}/{task.duration}
      </Text>
    </View>
  );
}

export default SlideItemTimed;

const styles = StyleSheet.create({
  measure: {
    backgroundColor: 'pink',
    height: 100,
    width: 100,
  },
});

import React, { useEffect } from 'react';
import { StyleSheet, Animated, ScrollView, SafeAreaView } from 'react-native';
import { ThemeProvider, Button } from 'react-native-elements';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

import { Text, View } from '../../components/Themed';
import { Workout } from '../../models/Workout';
import { Exercise } from '../../models/Exercise';
import { mainTheme } from '../../constants/theme/Main';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/models';

type TimerProps = {
  route: { params: { workoutId: string } };
  navigation: any;
};
type TimerState = {
  currentRepeat: number;
  currentTime: number;
  currentExerciseIndex: number;
  session: Workout;
  timerKeys: number[];
  isPlaying: boolean;
};
function WorkoutPlayerScreen(props: TimerProps) {
  const { workoutId } = props.route.params;

  const currentExercise = useSelector((state: RootState) =>
    state.workout.workouts.find((w) => w.id === workoutId)
  );

  useEffect(() => {});

  return (
    <ThemeProvider theme={mainTheme}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Playing: {currentExercise?.title}</Text>
        </ScrollView>
      </SafeAreaView>
    </ThemeProvider>
  );
}
export default WorkoutPlayerScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  remainingTime: {
    fontSize: 46,
  },
});

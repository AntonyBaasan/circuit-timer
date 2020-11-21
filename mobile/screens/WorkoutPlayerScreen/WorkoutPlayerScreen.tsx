import * as React from 'react';
import { StyleSheet, Animated, ScrollView, SafeAreaView } from 'react-native';
import { ThemeProvider, Button } from 'react-native-elements';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

import { Text, View } from '../../components/Themed';
import { Workout } from '../../models/Workout';
import { Exercise } from '../../models/Exercise';
import { mainTheme } from '../../constants/theme/Main';

type TimerProps = {
  route: { params: { workout: Workout } };
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
class WorkoutPlayerScreen extends React.PureComponent<TimerProps, TimerState> {
  constructor(props: TimerProps) {
    super(props);

    this.onStart = this.onStart.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onStop = this.onStop.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.isCurrentExercise = this.isCurrentExercise.bind(this);
    this.resetAllExercises = this.resetAllExercises.bind(this);
    this.isPlaying = this.isPlaying.bind(true);

    this.initSession();
  }

  getCurrentExercise(): Exercise {
    return this.state.session.exercises[this.state.currentExerciseIndex];
  }

  componentWillMount() {
    this.initSession();
  }

  initSession() {
    const { workout } = this.props.route.params;

    this.state = {
      currentRepeat: 1,
      currentTime: 0,
      currentExerciseIndex: 0,
      session: workout,
      timerKeys: workout.exercises.map((a) => Math.random()),
      isPlaying: false,
    };
  }

  onStart() {
    this.playCurrentExercise(true);

    const exercise = this.getCurrentExercise();
    this.setState({
      ...this.state,
      currentTime: exercise.seconds,
    });
  }
  onPause() {
    this.playCurrentExercise(false);
  }
  onStop() {
    this.playCurrentExercise(false);
  }
  playCurrentExercise(play: boolean) {
    const currentExercise = this.state.session.exercises[
      this.state.currentExerciseIndex
    ];
    this.state.session.exercises[this.state.currentExerciseIndex] = Object.assign(
      {},
      currentExercise
    );

    this.setState({
      ...this.state,
      session: {
        ...this.state.session,
        exercises: [...this.state.session.exercises],
      },
      isPlaying: play,
    });
  }
  resetAllExercises() {
    const exercises = this.state.session.exercises.map((a) => {
      a.id = a.id + 1;
      return Object.assign({}, a);
    });

    this.setState({
      ...this.state,
      session: {
        ...this.state.session,
        exercises: [...exercises],
      },
      isPlaying: false,
    });
  }
  updateTimer() {
    if (this.state.currentTime === 0) {
      this.onStop();
    } else {
      this.setState({
        ...this.state,
        currentTime: this.state.currentTime - 1,
      });
    }
  }
  checkCompletion() {
    if (this.state.currentExerciseIndex < this.state.session.exercises.length - 1) {
      this.playCurrentExercise(false);
      this.setState({
        ...this.state,
        currentExerciseIndex: this.state.currentExerciseIndex + 1,
      });
      this.onStart();
    } else if (this.state.currentRepeat < this.state.session.repetition) {
      this.setState({
        ...this.state,
        currentRepeat: this.state.currentRepeat + 1,
        currentExerciseIndex: 0,
      });
      this.resetAllExercises();
      this.onStart();
    } else {
    }
  }
  isCurrentExercise(exercise: Exercise) {
    return this.getCurrentExercise() === exercise;
  }
  isPlaying(i: number): boolean | undefined {
    return this.state.isPlaying && this.state.currentExerciseIndex === i;
  }
  renderStartButton() {
    return <Button title="Start" onPress={this.onStart} />;
  }
  renderPauseButton() {
    return <Button title="Pause" onPress={this.onPause} />;
  }
  renderStopButton() {
    return <Button title="Stop" onPress={this.onStop} />;
  }
  renderTimers() {
    const exercises = this.state.session.exercises;
    return (
      <View>
        {exercises.map((a, i) => (
          <View key={a.id}>
            {this.isCurrentExercise(a) && (
              <Text key={a.id + 1} style={styles.title}>
                Current
              </Text>
            )}
            <CountdownCircleTimer
              key={this.state.timerKeys[i]}
              isPlaying={this.isPlaying(i)}
              duration={a.seconds}
              onComplete={() => {
                this.checkCompletion();
                // do your stuff here
                return [false, 1000]; // repeat animation in 1.5 seconds
              }}
              colors={
                [['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']] as any
              }
            >
              {({ remainingTime, animatedColor }: any) => (
                <Animated.Text
                  style={{ ...styles.remainingTime, color: animatedColor }}
                >
                  {remainingTime}
                </Animated.Text>
              )}
            </CountdownCircleTimer>
          </View>
        ))}
      </View>
    );
  }

  render() {
    return (
      <ThemeProvider theme={mainTheme}>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>{this.state.currentRepeat}</Text>
            {this.renderStartButton()}
            {this.renderPauseButton()}
            {this.renderStopButton()}
            <Text style={styles.title}>
              Start Time: {this.state.currentTime}
            </Text>
            <View
              style={styles.separator}
              lightColor="#eee"
              darkColor="rgba(255,255,255,0.1)"
            />
            {this.renderTimers()}
          </ScrollView>
        </SafeAreaView>
      </ThemeProvider>
    );
  }
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

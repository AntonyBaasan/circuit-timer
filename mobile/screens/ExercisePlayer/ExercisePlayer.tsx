import * as React from "react";
import { StyleSheet, Animated, ScrollView, SafeAreaView } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

import { Text, View } from "../../components/Themed";
import { Exercise } from "../../models/Exercise";
import { Action } from "../../models/Action";
import { ThemeProvider, Button } from "react-native-elements";
import { mainTheme } from "../../constants/theme/main-theme";

type TimerProps = {
  route: { params: { exercise: Exercise } };
  navigation: any;
};
type TimerState = {
  currentRepeat: number;
  currentTime: number;
  currentActionIndex: number;
  session: Exercise;
  timerKeys: number[];
  isPlaying: boolean;
};
class ExercisePlayer extends React.PureComponent<TimerProps, TimerState> {
  constructor(props: TimerProps) {
    super(props);

    this.onStart = this.onStart.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onStop = this.onStop.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.isCurrentAction = this.isCurrentAction.bind(this);
    this.resetAllActions = this.resetAllActions.bind(this);
    this.isPlaying = this.isPlaying.bind(true);

    this.initSession();
  }

  getCurrentAction(): Action {
    return this.state.session.actions[this.state.currentActionIndex];
  }

  componentWillMount() {
    this.initSession();
  }

  initSession() {
    const { exercise } = this.props.route.params;

    this.state = {
      currentRepeat: 1,
      currentTime: 0,
      currentActionIndex: 0,
      session: exercise,
      timerKeys: exercise.actions.map((a) => Math.random()),
      isPlaying: false,
    };
  }

  onStart() {
    this.playCurrentAction(true);

    const action = this.getCurrentAction();
    this.setState({
      ...this.state,
      currentTime: action.seconds,
    });
  }
  onPause() {
    this.playCurrentAction(false);
  }
  onStop() {
    this.playCurrentAction(false);
  }
  playCurrentAction(play: boolean) {
    const currentAction = this.state.session.actions[
      this.state.currentActionIndex
    ];
    this.state.session.actions[this.state.currentActionIndex] = Object.assign(
      {},
      currentAction
    );

    this.setState({
      ...this.state,
      session: {
        ...this.state.session,
        actions: [...this.state.session.actions],
      },
      isPlaying: play,
    });
  }
  resetAllActions() {
    const actions = this.state.session.actions.map((a) => {
      a.id = a.id + 1;
      return Object.assign({}, a);
    });

    this.setState({
      ...this.state,
      session: {
        ...this.state.session,
        actions: [...actions],
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
    if (this.state.currentActionIndex < this.state.session.actions.length - 1) {
      this.playCurrentAction(false);
      this.setState({
        ...this.state,
        currentActionIndex: this.state.currentActionIndex + 1,
      });
      this.onStart();
    } else if (this.state.currentRepeat < this.state.session.repetition) {
      this.setState({
        ...this.state,
        currentRepeat: this.state.currentRepeat + 1,
        currentActionIndex: 0,
      });
      this.resetAllActions();
      this.onStart();
    } else {
    }
  }
  isCurrentAction(action: Action) {
    return this.getCurrentAction() === action;
  }
  isPlaying(i: number): boolean | undefined {
    return this.state.isPlaying && this.state.currentActionIndex === i;
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
    const actions = this.state.session.actions;
    return (
      <View>
        {actions.map((a, i) => (
          <View key={a.id}>
            {this.isCurrentAction(a) && (
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
                [["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]] as any
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
export default ExercisePlayer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  remainingTime: {
    fontSize: 46,
  },
});

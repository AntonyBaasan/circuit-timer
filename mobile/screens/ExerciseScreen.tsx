import * as React from 'react';
import { StyleSheet, Button, Animated } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

import { Text, View } from '../components/Themed';
import { Exercise } from '../models/Exercise';
import { Action } from '../models/Action';
import { ActionType } from '../models/ActionType';

type TimerProps = { route: any };
type TimerState = {
  currentRepeat: number;
  currentTime: number;
  currentAction: number;
  session: Exercise;
};
class ExerciseScreen extends React.PureComponent<TimerProps, TimerState> {
  // private interval: any;
  // private defaultSession: Exercise = {
  //   repetition: 2,
  //   actions: [
  //     { type: ActionType.work, seconds: 5, isPlaying: false, id: '1000' },
  //     { type: ActionType.rest, seconds: 2, isPlaying: false, id: '2000' },
  //   ],
  // };
  constructor(props: TimerProps) {
    super(props);

    const { exercise } = this.props.route.params;

    this.state = {
      currentRepeat: 1,
      currentTime: 0,
      currentAction: 0,
      session: exercise,
    };

    this.onStart = this.onStart.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onStop = this.onStop.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.isCurrentAction = this.isCurrentAction.bind(this);
    this.restartAllActions = this.restartAllActions.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tab One</Text>
        <Button
          title="Go Back"
          onPress={() => {
            this.props.navigation.goBack();
          }}
        />
        <Text style={styles.title}>{this.state.currentRepeat}</Text>
        {this.renderStartButton()}
        {this.renderPauseButton()}
        {this.renderStopButton()}
        <Text style={styles.title}>{this.state.currentTime}</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        {this.renderTimers()}
      </View>
    );
  }

  getCurrentAction(): Action {
    return this.state.session.actions[this.state.currentAction];
  }

  onStart() {
    this.playCurrentAction(true);

    const action = this.getCurrentAction();
    this.setState({
      ...this.state,
      currentTime: action.seconds,
    });
    // this.interval = setInterval(() => {
    //   this.updateTimer();
    // }, 1000);
  }
  onPause() {
    this.playCurrentAction(false);

    // clearInterval(this.interval);
  }
  onStop() {
    this.playCurrentAction(false);

    // this.setState({
    //   currentTime: 0,
    //   currentAction: 0,
    //   session: this.defaultSession,
    // });
    // clearInterval(this.interval);
  }
  playCurrentAction(play: boolean) {
    const currentAction = this.state.session.actions[this.state.currentAction];
    currentAction.isPlaying = play;
    this.state.session.actions[this.state.currentAction] = Object.assign(
      {},
      currentAction
    );

    this.setState({
      ...this.state,
      session: {
        ...this.state.session,
        actions: [...this.state.session.actions],
      },
    });
  }
  restartAllActions() {
    const actions = this.state.session.actions.map((a) => {
      a.id = a.id + 1;
      a.isPlaying = false;
      return Object.assign({}, a);
    });

    this.setState({
      ...this.state,
      session: {
        ...this.state.session,
        actions: [...actions],
      },
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
    if (this.state.currentAction < this.state.session.actions.length - 1) {
      this.playCurrentAction(false);
      this.setState({
        ...this.state,
        currentAction: this.state.currentAction + 1,
      });
      this.onStart();
    } else if (this.state.currentRepeat < this.state.session.repetition) {
      this.setState({
        ...this.state,
        currentRepeat: this.state.currentRepeat + 1,
        currentAction: 0,
      });
      this.restartAllActions();
      this.onStart();
    } else {
    }
  }
  isCurrentAction(action: Action) {
    return this.getCurrentAction() === action;
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
              isPlaying={a.isPlaying}
              duration={a.seconds}
              onComplete={() => {
                this.checkCompletion();
                // do your stuff here
                return [false, 1000]; // repeat animation in 1.5 seconds
              }}
              colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
            >
              {({ remainingTime, animatedColor }) => (
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
}
export default ExerciseScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

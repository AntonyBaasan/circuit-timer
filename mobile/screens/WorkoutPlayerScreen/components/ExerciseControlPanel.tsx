import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeProvider, Button, Icon, Text } from 'react-native-elements';
import { mainTheme } from '../../../constants/theme/Main';
import { ExerciseType } from '../../../models/ExcerciseType';
import { Exercise } from '../../../models/Exercise';
import { ExerciseTask } from '../../../models/ExerciseTask';

import ControlButton from './ControlButton';

type ExerciseControlPanelProps = {
  task: ExerciseTask | undefined;
  isDone: boolean;
  onExerciseTable: () => void;
  onDone: () => void;
  onSkipForward: () => void;
  onPause: () => void;
};

const ControlButtonSize = 50;

function ExerciseControlPanel(props: ExerciseControlPanelProps) {
  const { task, isDone } = props;

  const RenderRepsButtons = () => (
    <View style={styles.buttonRow}>
      <ControlButton
        iconName="md-list"
        size={ControlButtonSize}
        onPress={props.onExerciseTable}
        disabled={isDone}
      />
      <ControlButton
        iconName="md-checkmark"
        size={ControlButtonSize}
        onPress={props.onDone}
        disabled={isDone}
      />
      <ControlButton
        iconName="md-skip-forward"
        size={ControlButtonSize}
        onPress={props.onSkipForward}
        disabled={isDone}
      />
    </View>
  );

  const RenderCardioButtons = () => (
    <View style={styles.buttonRow}>
      <ControlButton
        iconName="md-list"
        size={ControlButtonSize}
        onPress={props.onExerciseTable}
        disabled={isDone}
      />
      <ControlButton
        iconName="ios-pause"
        size={ControlButtonSize}
        onPress={props.onPause}
        disabled={isDone}
      />
      <ControlButton
        iconName="md-skip-forward"
        size={ControlButtonSize}
        onPress={props.onSkipForward}
        disabled={isDone}
      />
    </View>
  );

  const RenderButtons = () => {
    if (task?.exerciseType === ExerciseType.Reps) {
      return RenderRepsButtons();
    }
    if (
      task?.exerciseType === ExerciseType.Cardio ||
      task?.exerciseType === ExerciseType.Rest
    ) {
      return RenderCardioButtons();
    }
  };

  return <View style={styles.container}>{RenderButtons()}</View>;
}

export default ExerciseControlPanel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    alignContent: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',
  },
});

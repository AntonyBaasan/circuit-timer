import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeProvider, Button, Icon, Text } from 'react-native-elements';

import { View } from '../../components/Themed';
import { mainTheme } from '../../constants/theme/Main';
import { ExerciseType } from '../../models/ExcerciseType';
import { Exercise } from '../../models/Exercise';
import ControlButton from './ControlButton';

type ExerciseControlPanelProps = {
  exercise: Exercise | undefined;
  onExerciseTable: () => void;
};

const ControlButtonSize = 50;

function ExerciseControlPanel(props: ExerciseControlPanelProps) {
  const { exercise } = props;

  const RenderRepsButtons = () => (
    <View style={styles.buttonRow}>
      <ControlButton
        iconName="md-list"
        size={ControlButtonSize}
        onPress={props.onExerciseTable}
      />
      <ControlButton
        iconName="md-checkmark"
        size={ControlButtonSize}
        onPress={props.onExerciseTable}
      />
      <ControlButton
        iconName="md-skip-forward"
        size={ControlButtonSize}
        onPress={props.onExerciseTable}
      />
    </View>
  );

  const RenderCardioButtons = () => (
    <View style={styles.buttonRow}>
      <ControlButton
        iconName="md-list"
        size={ControlButtonSize}
        onPress={props.onExerciseTable}
      />
      <ControlButton
        iconName="ios-pause"
        size={ControlButtonSize}
        onPress={props.onExerciseTable}
      />
      <ControlButton
        iconName="md-skip-forward"
        size={ControlButtonSize}
        onPress={props.onExerciseTable}
      />
    </View>
  );

  const RenderButtons = () => {
    if (exercise?.exerciseType === ExerciseType.Reps) {
      return RenderRepsButtons();
    }
    if (
      exercise?.exerciseType === ExerciseType.Cardio ||
      exercise?.exerciseType === ExerciseType.Rest
    ) {
      return RenderCardioButtons();
    }
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <View style={styles.container}>{RenderButtons()}</View>
    </ThemeProvider>
  );
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
    backgroundColor: 'grey',
  },
});

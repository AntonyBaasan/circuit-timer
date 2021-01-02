import i18n from 'i18n-js';
import * as React from 'react';

import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Input, ButtonGroup, Slider } from 'react-native-elements';
import { ExerciseType } from '../../../models/ExcerciseType';

import { Exercise } from '../../../models/Exercise';
import ExerciseRepSelector from './ExerciseRepSelector';
import ExerciseTimeSelector from './ExerciseTimeSelector';

type ExerciseEditorFormProps = {
  isNew: boolean;
  exercise: Exercise;
};

function ExerciseEditorForm(props: ExerciseEditorFormProps) {
  const { isNew, exercise } = props;

  useEffect(() => {
    console.log('ExerciseEditorForm useEffect exercise:', exercise);
  }, [exercise]);

  const updateIndex = (selectedIndex: number) => {
    setSelectedIndex(selectedIndex);
  };
  const component1 = () => <Text>Cardio</Text>;
  const component2 = () => <Text>Repetition</Text>;
  const exerciseTypeButtons = [
    { element: component1 },
    { element: component2 },
  ];

  const getSelectedIndex = (): number => {
    if (exercise.exerciseType === ExerciseType.Cardio) {
      return 0;
    }
    return 1;
  };
  // temp
  const [selectedIndex, setSelectedIndex] = useState(getSelectedIndex());

  const renderRepTimeSelector = () => {
    if (selectedIndex === 0) {
      return <ExerciseTimeSelector exercise={exercise} />;
    }
    if (selectedIndex === 1) {
      return <ExerciseRepSelector exercise={exercise} />;
    }
  };
  const renderRestSlider = () => {
    if (exercise.hasRest) {
      return (
        <View style={styles.restSlider}>
          <Slider
            maximumValue={30}
            value={exercise.restTime}
            onValueChange={(value) => exercise.restTime}
          />
          <Text>Value: {exercise.restTime}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Input placeholder={i18n.t('model.title')} value={exercise.title} />
      <ButtonGroup
        onPress={updateIndex}
        selectedIndex={selectedIndex}
        buttons={exerciseTypeButtons}
        containerStyle={{ height: 35 }}
      />
      <Text>Sets</Text>
      {renderRepTimeSelector()}
      <Text>Has Rest</Text>
      {renderRestSlider()}
      <Input
        placeholder={i18n.t('model.description')}
        multiline={true}
        value={exercise.description}
      />
    </View>
  );
}

export default ExerciseEditorForm;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
  },
  restSlider:{
      margin: 10
  }
});

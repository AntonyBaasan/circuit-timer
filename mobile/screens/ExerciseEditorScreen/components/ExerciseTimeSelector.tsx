import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Exercise } from '../../../models/Exercise';
import { Picker } from '@react-native-picker/picker';
const Item = Picker.Item as any;

type ExerciseTimeSelectorProps = {
  exercise: Exercise;
};

function ExerciseTimeSelector(props: ExerciseTimeSelectorProps) {
  const { exercise } = props;

  const [minValue, setMinValue] = React.useState(1);
  const [secValue, setSecValue] = React.useState(0);

  useEffect(() => {}, []);

  const renderPickerItem = (len: number, keyPrefix: string) =>
    Array.from({ length: len }, (v, i) => i).map((num) => (
      <Item key={keyPrefix + num} label={keyPrefix + num} value={num} />
    ));

  return (
    <View style={styles.container}>
      <Text>Sets</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        placeholder="Sets"
        keyboardType="number-pad"
        value={exercise.sets.toString()}
      />

      <Text>Min</Text>
      <Picker
        testID="min-picker"
        selectedValue={minValue}
        onValueChange={(v) => setMinValue(v as any)}
      >
        {renderPickerItem(60, 'min')}
      </Picker>
      <Text>Sec</Text>
      <Picker
        testID="sec-picker"
        selectedValue={secValue}
        onValueChange={(v) => setSecValue(v as any)}
      >
        {renderPickerItem(60, 'sec')}
      </Picker>
    </View>
  );
}

export default ExerciseTimeSelector;

const styles = StyleSheet.create({
  container: {},
});

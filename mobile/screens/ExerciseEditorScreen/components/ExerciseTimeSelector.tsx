import * as React from 'react';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Exercise } from '../../../models/Exercise';

type ExerciseTimeSelectorProps = {
  exercise: Exercise;
};

function ExerciseTimeSelector(props: ExerciseTimeSelectorProps) {
  const { exercise } = props;

  useEffect(() => {}, []);

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={styles.container}>
      <Text>Sets</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        placeholder="Sets"
        keyboardType="number-pad"
        value={exercise.sets.toString()}
      />
      <Text>Time</Text>
      <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View>
      <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={mode as any}
        is24Hour={true}
        display="default"
        onChange={onChange}
      />
    </View>
  );
}

export default ExerciseTimeSelector;

const styles = StyleSheet.create({
  container: {},
});

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import i18n from 'i18n-js';

import { ThemeProvider, Button, Text } from 'react-native-elements';
import { mainTheme } from '../../constants/theme/Main';
import { Workout } from '../../models/Workout';
import { ScreenNames } from '../../constants/Screen';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/models';
import { ScrollView } from 'react-native-gesture-handler';

type WorkoutDetailScreenProps = {
  navigation: any;
  route: { params: { workoutId: string } };
};

function WorkoutDetailScreen(props: WorkoutDetailScreenProps) {
  const { workoutId } = props.route?.params;

  const workouts = useSelector((state: RootState) => state.workout.workouts);
  const [workout, setWorkout] = useState<Workout>();

  useEffect(() => {
    console.log('useEffect workouts called.');
    const found = workouts.find((d) => d.id === workoutId);
    setWorkout(found);
  }, [workouts]);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: workout == null ? 'No title' : workout.title,
    });
  }, [workout]);

  const onEdit = () => {
    console.log(workout?.id);
    props.navigation.navigate(ScreenNames.WorkoutEditorScreen, {
      workoutId,
    });
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <ScrollView>
        <View style={styles.container}>
          <Text>Workout Detail</Text>
          <Text>ID: {workout?.id}</Text>
        </View>
        <View>
          <Button title={i18n.t('edit')} onPress={onEdit} />
        </View>
        <Text>{JSON.stringify(workout, null, 2)}</Text>
      </ScrollView>
    </ThemeProvider>
  );
}

export default WorkoutDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
  },
});

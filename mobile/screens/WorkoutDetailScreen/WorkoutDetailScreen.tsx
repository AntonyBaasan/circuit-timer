import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import i18n from 'i18n-js';

import { ThemeProvider, Button, Text } from 'react-native-elements';
import { mainTheme } from '../../constants/theme/Main';
import { DEMO_WORKOUT } from '../../data/example';
import { Workout } from '../../models/Workout';
import { ScreenNames } from '../../constants/Screen';

type WorkoutDetailScreenProps = {
  navigation: any;
  route: { params: { workoutId: string } };
};

function WorkoutDetailScreen(props: WorkoutDetailScreenProps) {
  const { workoutId } = props.route?.params;

  const [workout, setWorkout] = useState<Workout>();

  useEffect(() => {
    const found = DEMO_WORKOUT.find((d) => d.id === workoutId);
    setWorkout(found);
  }, []);

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
      <View style={styles.container}>
        <Text>Workout Detail</Text>
        <Text>ID: {workout?.id}</Text>
        <Text>{JSON.stringify(workout)}</Text>
      </View>
      <View>
        <Button title={i18n.t('edit')} onPress={onEdit} />
      </View>
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

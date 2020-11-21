import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import i18n from 'i18n-js';

import { View } from '../../components/Themed';
import { ThemeProvider, Button, Icon, Text } from 'react-native-elements';
import { mainTheme } from '../../constants/theme/Main';
import { DEMO_WORKOUT } from '../../data/example';
import { Workout } from '../../models/Workout';

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

  return (
    <ThemeProvider theme={mainTheme}>
      <View style={styles.container}>
        <Text>Workout Detail</Text>
        <Text>ID: {workout?.id}</Text>
      </View>
    </ThemeProvider>
  );
}

export default WorkoutDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
  },
});

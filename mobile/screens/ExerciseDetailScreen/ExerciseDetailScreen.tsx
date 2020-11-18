import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import i18n from 'i18n-js';

import { View } from '../../components/Themed';
import { ThemeProvider, Button, Icon, Text } from 'react-native-elements';
import { mainTheme } from '../../constants/theme/Main';
import { Exercise } from '../../models/exercise';
import { DEMO_EXERCISE } from '../../data/example';

type ExerciseDetailScreenProps = {
  navigation: any;
  route: { params: { exerciseId: string } };
};

function ExerciseDetailScreen(props: ExerciseDetailScreenProps) {
  const { exerciseId } = props.route?.params;

  const [exercise, setExercise] = useState<Exercise>();

  useEffect(() => {
    const found = DEMO_EXERCISE.find((d) => d.id === exerciseId);
    setExercise(found);
  }, []);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: exercise == null ? 'No title' : exercise.title,
    });
  }, [exercise]);

  return (
    <ThemeProvider theme={mainTheme}>
      <View style={styles.container}>
        <Text>Exercise Detail</Text>
        <Text>ID: {exercise?.id}</Text>
      </View>
    </ThemeProvider>
  );
}

export default ExerciseDetailScreen;

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

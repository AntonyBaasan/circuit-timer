import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import {} from '../../components/Themed';
import { Workout } from '../../models/Workout';
import WorkoutEditorForm from './components/WorkoutEditorForm';

type WorkoutEditorScreenProps = {
  navigation: any;
  workout?: Workout;
};

function WorkoutDetailScreen(props: WorkoutEditorScreenProps) {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <WorkoutEditorForm
          navigation={props.navigation}
          workout={props.workout}
        />
      </View>
    </ScrollView>
  );
}

export default WorkoutDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});

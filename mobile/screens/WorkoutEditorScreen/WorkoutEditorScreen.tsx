import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../../store/models';
import WorkoutEditorForm from './components/WorkoutEditorForm';
import { Workout } from '../../models/Workout';

type WorkoutEditorScreenProps = {
  navigation: any;
  route: { params: { workoutId: string } };
};

function WorkoutEditorScreen(props: WorkoutEditorScreenProps) {
  const { workoutId } = props.route?.params;
  console.log(workoutId);

  const workout = useSelector((state: RootState) =>
    state.workout.workouts.find((w) => w.id === workoutId)
  );

  const onWorkoutSaved = (workout: Workout) => {
    console.log(workout);
    //TODO: save workout

    props.navigation.pop();
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <WorkoutEditorForm
          navigation={props.navigation}
          workout={workout}
          save={onWorkoutSaved}
        />
      </View>
    </ScrollView>
  );
}

export default WorkoutEditorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});

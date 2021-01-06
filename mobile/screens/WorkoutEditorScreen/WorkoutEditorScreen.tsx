import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store/models';
import WorkoutEditorForm from './components/WorkoutEditorForm';
import { Workout } from '../../models/Workout';
import { loadExercises } from '../../store/exercise/actions';
import { createWorkout, updateWorkout } from '../../store/workout/actions';

type WorkoutEditorScreenProps = {
  navigation: any;
  route: { params: { workoutId: string } };
};

function WorkoutEditorScreen(props: WorkoutEditorScreenProps) {
  const { workoutId } = props.route?.params;
  console.log(workoutId);

  const [isNew, setIsNew] = useState(workoutId === undefined);
  const dispatch = useDispatch();
  const workout = useSelector((state: RootState) =>
    state.workout.workouts.find((w) => w.id === workoutId)
  );
  const exercises = useSelector((state: RootState) => state.exercise.exercises);

  useEffect(() => {
    dispatch(loadExercises(workout ? workout.id : ''));
    return () => {
      // after closing this screen should clear current exercise list from state.
      dispatch(loadExercises(''));
    };
  }, []);
  useEffect(() => {
    setIsNew(workoutId === undefined);
  }, [workoutId]);

  const onWorkoutSaved = (workout: Workout) => {
    if (isNew) {
      dispatch(createWorkout(workout));
      props.navigation.popToTop();
    } else {
      dispatch(updateWorkout(workout));
      props.navigation.pop();
    }
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
          exercises={exercises}
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

import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { createDefaultExercise } from '../../constants/DefaultValues';

import { Exercise } from '../../models/Exercise';
import { addExercises, updateExercises } from '../../store/exercise/actions';
import ExerciseEditorForm from './components/ExerciseEditorForm';

type ExerciseEditorScreenProps = {
  navigation: any;
  route: { params: { workoutId: string; exercise?: Exercise; order: number } };
};

function ExerciseEditorScreen(props: ExerciseEditorScreenProps) {
  const { workoutId, exercise, order } = props.route.params;
  const dispatch = useDispatch();

  let current: Exercise = exercise ?? createDefaultExercise(workoutId);
  const [isNew, setIsNew] = useState(exercise == null);

  useEffect(() => {
    console.log('ExerciseEditorScreen useEffect exercise:', exercise);
    setIsNew(exercise == null);
    current = exercise ?? createDefaultExercise(workoutId);
  }, [exercise]);

  const onExerciseSave = (exercise: Exercise) => {
    console.log('saving exercise');
    console.log(exercise);
    if (isNew) {
      dispatch(addExercises(order, exercise));
    } else {
      dispatch(updateExercises(exercise));
    }

    props.navigation.pop();
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <ExerciseEditorForm exercise={current} save={onExerciseSave} />
      </View>
    </ScrollView>
  );
}

export default ExerciseEditorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
  },
});

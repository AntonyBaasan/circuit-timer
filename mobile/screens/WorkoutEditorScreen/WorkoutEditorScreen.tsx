import * as React from 'react';
import i18n from 'i18n-js';
import { useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import { CustomHeaderButton } from '../../components/navigation/HeaderButtons';

import {} from '../../components/Themed';
import { RootState } from '../../store/models';
import WorkoutEditorForm from './components/WorkoutEditorForm';

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

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <WorkoutEditorForm navigation={props.navigation} workout={workout} />
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

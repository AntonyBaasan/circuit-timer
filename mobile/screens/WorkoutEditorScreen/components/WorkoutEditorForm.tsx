import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { CheckBox, Icon, Input, Text } from 'react-native-elements';

import { ScreenNames } from '../../../constants/Screen';
import { Workout } from '../../../models/Workout';
import ExerciseListForm from './ExerciseListForm';
import TagView from './TagView';

type WorkoutEditorFormProps = {
  navigation: any;
  workout?: Workout;
};

function WorkoutEditorForm(props: WorkoutEditorFormProps) {
  const { navigation, workout } = props;

  //   const [currentWorkout, setCurrentWorkout] = useState(workout);
  const [current, setCurrent] = useState({
    id: 'new id',
    title: 'Title is here',
    description: 'This is Description',
    tags: [
        'tag one', 'tag2',
        'tag one', 'tag2fff ',
        'tag onea 123', 'tag2asdfas',
        'tag one', 'tag2',
        'tag one', 'tag2 bla',
    ],
    //   authorId?: string;
    //   workoutPackageId: string;
    exercises: [],
    //   image?: string;
  } as Workout);
  const buttons = ['Hello', 'World', 'Buttons'];

  useEffect(() => {
    // setCurrent(workout);
  }, [workout]);

  function clickActionScreen() {
    navigation.navigate(ScreenNames.ActionEditorScreen);
  }

  return (
    <View style={styles.container}>
      <Input placeholder="Title" value={current.title} />
      <Input
        placeholder="Description"
        multiline={true}
        value={current.description}
      />
      <TagView title={'Tags'} tags={current.tags} />
      <ExerciseListForm navigation={navigation} exercises={current.exercises} />

      <TouchableOpacity onPress={clickActionScreen}>
        <Icon size={45} name="create" type="evilicons" />
        <Text style={styles.text}>Add Exercise</Text>
      </TouchableOpacity>
    </View>
  );
}

export default WorkoutEditorForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
  },
});

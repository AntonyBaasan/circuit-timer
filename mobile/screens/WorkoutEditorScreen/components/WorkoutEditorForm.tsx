import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Workout } from '../../../models/Workout';
import ExerciseList from './ExerciseList';
import TagView from './TagView';

type WorkoutEditorFormProps = {
  navigation: any;
  workout?: Workout;
};

function WorkoutEditorForm(props: WorkoutEditorFormProps) {
  const { navigation, workout } = props;

  const [showAdvanced, setShowAdvanced] = useState(false);
  //   const [currentWorkout, setCurrentWorkout] = useState(workout);
  const [current, setCurrent] = useState({
    id: 'new id',
    title: 'Title is here',
    description: 'This is Description',
    tags: [
      'tag one',
      'tag2',
      'tag one',
      'tag2fff ',
      'tag onea 123',
      'tag2asdfas',
      'tag one',
      'tag2',
      'tag one',
      'tag2 bla',
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

  function clickDeleteWorkout() {}

  const renderAdvanced = () => {
    if (showAdvanced) {
      return (
        <View>
          <View>
            <Text>Image for this workout</Text>
            <Text>Schedule</Text>
            <Text>Color</Text>
            <Text>Default rest time</Text>
          </View>
          <View>
            <Button
              icon={<Ionicons name="ios-trash" size={24} color="red" />}
              buttonStyle={styles.buttonStyle}
              titleStyle={styles.buttonTextStyle}
              title={'Delete'}
              type="outline"
              onPress={clickDeleteWorkout}
            />
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Input placeholder="Title" value={current.title} />
      <Input
        placeholder="Description"
        multiline={true}
        value={current.description}
      />
      <TagView title={'Tags'} tags={current.tags} />
      <View style={styles.divider} />
      <ExerciseList navigation={navigation} exercises={current.exercises} />
      <View style={styles.divider} />
      {/* advanced area */}
      <TouchableOpacity onPress={() => setShowAdvanced(!showAdvanced)}>
        <Text>Toggle Advanced</Text>
      </TouchableOpacity>
      {renderAdvanced()}
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
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonStyle: {
    margin: 10,
    height: 50,
    borderColor: 'red',
  },
  buttonTextStyle: {
    marginLeft: 10,
    color: 'red',
  },
});

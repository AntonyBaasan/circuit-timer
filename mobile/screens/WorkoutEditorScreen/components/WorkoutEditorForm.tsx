import { Ionicons } from '@expo/vector-icons';
import i18n from 'i18n-js';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createDefaultWorkout } from '../../../constants/DefaultValues';

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

  const [current, setCurrent] = useState(workout ?? createDefaultWorkout());

  useEffect(() => {
    setCurrent(workout ?? createDefaultWorkout());
  }, [workout]);

  function clickDeleteWorkout() {}

  const addTag = (newTag: string) => {
    // need to do properly
    workout?.tags.push(newTag);
  };
  const removeTag = (tag: string) => {
    console.log('tag removed: ', tag);
    // need to do properly
    if (workout) {
      const index = workout?.tags.findIndex((t) => t === tag);
      workout?.tags.splice(index, 1);
    }
  };

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
              title={i18n.t('delete')}
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
      <Input placeholder={i18n.t('model.title')} value={current.title} />
      <Input
        placeholder={i18n.t('model.description')}
        multiline={true}
        value={current.description}
      />
      <TagView
        title={i18n.t('tags')}
        tags={current.tags}
        addTag={addTag}
        removeTag={removeTag}
      />
      <View style={styles.divider} />
      <ExerciseList navigation={navigation} exercises={current.exercises} />
      <View style={styles.divider} />
      {/* advanced area */}
      <TouchableOpacity onPress={() => setShowAdvanced(!showAdvanced)}>
        <Button title={showAdvanced ? 'Hide Advanced' : 'Show Advanced'} />
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

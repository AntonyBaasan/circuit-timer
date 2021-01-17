import { Ionicons } from '@expo/vector-icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import i18n from 'i18n-js';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createDefaultWorkout } from '../../../constants/DefaultValues';

import { Workout } from '../../../models/Workout';
import TagView from './TagView';
import { Exercise } from '../../../models/Exercise';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../../../components/navigation/HeaderButtons';
import { ScreenNames } from '../../../constants/Screen';
import DraggableFlatList from 'react-native-draggable-flatlist';
import ExerciseListItem from './ExerciseListItem';

type WorkoutEditorFormProps = {
  navigation: any;
  workout: Workout;
  exercises: Exercise[];
  save: (workout: Workout) => void;
};

function WorkoutEditorForm(props: WorkoutEditorFormProps) {
  const { navigation, exercises, workout, save } = props;
  useEffect(() => {
    formik.setFieldValue('exercises', exercises);
  }, [exercises]);

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [current, setCurrent] = useState(workout ?? createDefaultWorkout());

  const initialValues = {
    id: current.id,
    title: current.title,
    description: current.description,
    tags: current.tags,
    exercises: [],
  };
  const validationSchema = Yup.object({
    title: Yup.string()
      .max(50, 'Must be 50 characters or less')
      .required('Required'),
    description: Yup.string().max(1000, 'Must be 1000 characters or less'),
    // email: Yup.string().email('Invalid email address').required('Required'),
  });
  const handOnSubmit = (values: any) => {
    const newUpdatedWorkout = Object.assign({}, values);
    delete newUpdatedWorkout.exercises;
    save(newUpdatedWorkout);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handOnSubmit,
  });

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            disabled={!formik.isValid}
            style={{}}
            buttonStyle={{ color: formik.isValid ? 'white' : 'grey' }}
            title={i18n.t('save')}
            // iconName="ios-add-circle-outline"
            onPress={formik.submitForm}
          />
        </HeaderButtons>
      ),
    });
  }, [formik.errors]);

  function clickDeleteWorkout() {}

  const addTag = (tag: string) => {
    // need to do properly
    // console.log(formikRef);
    const tags = formik.values.tags as string[];
    const index = tags.findIndex((t) => t === tag);
    if (index === -1) {
      tags.push(tag);
      formik.setFieldValue('tags', tags);
    }
  };

  const removeTag = (tag: string) => {
    // need to do properly
    const tags = formik.values.tags as string[];
    const index = tags.findIndex((t) => t.toLowerCase() === tag.toLowerCase());
    if (index !== -1) {
      tags.splice(index, 1);
      formik.setFieldValue('tags', tags);
    }
  };

  const onExerciseReorder = (reorderExercises: Exercise[]) => {
    reorderExercises.forEach((e, index) => (e.order = index));
    formik.setFieldValue('exercises', [...reorderExercises]);
  };

  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  const clickAddExercise = (order: number) => {
    navigation.navigate(ScreenNames.ExerciseEditorScreen, {
      workoutId: workout.id,
      order,
      exercise: null,
    });
  };

  const renderAddNewButton = (index: number) => {
    return (
      <View style={styles.listItem}>
        <Button
          style={styles.addButton}
          onPress={() => clickAddExercise(index)}
        >
          +
        </Button>
      </View>
    );
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

  const renderExerciseItem = ({ item, index, drag, isActive }: any) => {
    return (
      <ExerciseListItem
        navigation={navigation}
        workoutId={workout.id}
        exercise={item}
        drag={drag}
      />
    );
  };

  const renderTop = () => (
    <View>
      <Text>{formik.isValid.toString()}</Text>
      <Input
        placeholder={i18n.t('model.title')}
        value={formik.values.title}
        onBlur={formik.handleBlur('title')}
        onChangeText={formik.handleChange('title')}
      />
      <Input
        placeholder={i18n.t('model.description')}
        value={formik.values.description}
        onBlur={formik.handleBlur('description')}
        onChangeText={formik.handleChange('description')}
      />
      <Text>
        {formik.touched.description && formik.errors.description
          ? formik.errors.description
          : null}
      </Text>
      <TagView
        title={i18n.t('tags')}
        tags={formik.values.tags}
        addTag={addTag}
        removeTag={removeTag}
      />
      <View style={styles.divider} />
      {renderAddNewButton(0)}
    </View>
  );

  const renderBottom = () => (
    <View>
      {exercises?.length > 0 && renderAddNewButton(exercises.length)}
      {/* <ExerciseList
        navigation={navigation}
        workoutId={current.id}
        exercises={formik.values.exercises}
        reordered={onExerciseReorder}
      /> */}
      <View style={styles.divider} />
      {/* advanced area */}
      <TouchableOpacity onPress={toggleAdvanced}>
        <Button title={showAdvanced ? 'Hide Advanced' : 'Show Advanced'} />
      </TouchableOpacity>
      {renderAdvanced()}
      <View style={styles.divider} />
      <Button
        disabled={!formik.isValid}
        title="Save"
        onPress={formik.handleSubmit as any}
      />
      {/* <Text>{JSON.stringify(formik, null, 2)}</Text> */}
    </View>
  );

  return (
    // <ScrollView>
    // <View style={styles.container}>{renderFormikForm()}</View>
    // </ScrollView>
    <DraggableFlatList
      style={{ width: '100%', backgroundColor: 'yellow' }}
      data={exercises}
      ListHeaderComponent={renderTop}
      renderItem={renderExerciseItem}
      ListFooterComponent={renderBottom}
      keyExtractor={(item, index) => `draggable-item-${item.id}`}
      onDragEnd={({ data }) => onExerciseReorder(data)}
    />
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
  listItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  addButton: {
    borderWidth: 1,
    width: 50,
    borderColor: 'black',
    margin: 5,
  },
  addButtonLabel: {
    fontSize: 20,
  },
});

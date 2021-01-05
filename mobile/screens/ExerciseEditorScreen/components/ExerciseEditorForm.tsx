import * as React from 'react';
import { useFormik } from 'formik';
import i18n from 'i18n-js';
import * as Yup from 'yup';

import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Text,
  Input,
  ButtonGroup,
  Slider,
  Button,
} from 'react-native-elements';
import { ExerciseType } from '../../../models/ExcerciseType';

import { Exercise } from '../../../models/Exercise';
import ExerciseRepSelector from './ExerciseRepSelector';
import ExerciseTimeSelector from './ExerciseTimeSelector';

type ExerciseEditorFormProps = {
  exercise: Exercise;
  save: (exercise: Exercise) => void;
};

function ExerciseEditorForm(props: ExerciseEditorFormProps) {
  const { exercise, save } = props;

  const initialValues = {
    id: exercise.id,
    workoutId: exercise.workoutId,
    title: exercise.title,
    exerciseType: exercise.exerciseType,
    description: exercise.description,
    sets: exercise.sets,
    duration: exercise.duration,
    hasRest: exercise.hasRest,
    restTime: exercise.restTime,
    reps: exercise.reps,
    weight: exercise.weight,
    image: exercise.image,
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    // email: Yup.string().email('Invalid email address').required('Required'),
  });
  const handOnSubmit = (values: any) => {
    const newUpdatedExercise = Object.assign({}, values);
    save(newUpdatedExercise);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handOnSubmit,
  });

  useEffect(() => {
    console.log('ExerciseEditorForm useEffect exercise:', exercise);
  }, [exercise]);

  const updateExerciseType = (selectedIndex: number) => {
    formik.setFieldValue('exerciseType', selectedIndex);
  };
  const component1 = () => <Text>Repetition</Text>;
  const component2 = () => <Text>Cardio</Text>;
  const exerciseTypeButtons = [
    { element: component1 },
    { element: component2 },
  ];

  const updateFormField = (fieldName: string, value: any) => {
    formik.setFieldValue(fieldName, value);
  };

  const renderRepTimeSelector = () => {
    if (formik.values.exerciseType === ExerciseType.Cardio) {
      return (
        <ExerciseTimeSelector
          sets={formik.values.sets}
          duration={formik.values.duration ?? 0}
          valueChanged={updateFormField}
        />
      );
    }
    if (formik.values.exerciseType === ExerciseType.Reps) {
      return (
        <ExerciseRepSelector
          sets={formik.values.sets}
          reps={formik.values.reps ?? 0}
          weight={formik.values.weight ?? 0}
          valueChanged={updateFormField}
        />
      );
    }
  };
  const renderRestSlider = () => {
    if (exercise.hasRest) {
      return (
        <View style={styles.restSlider}>
          <Slider
            maximumValue={30}
            value={exercise.restTime}
            onValueChange={(value) => exercise.restTime}
          />
          <Text>Value: {exercise.restTime}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder={i18n.t('model.title')}
        value={formik.values.title}
        onChangeText={formik.handleChange('title')}
      />
      <ButtonGroup
        onPress={updateExerciseType}
        selectedIndex={formik.values.exerciseType}
        buttons={exerciseTypeButtons}
        containerStyle={{ height: 35 }}
      />
      <Text>Sets</Text>
      {renderRepTimeSelector()}
      <Text>Has Rest</Text>
      {renderRestSlider()}
      <Input
        placeholder={i18n.t('model.description')}
        multiline={true}
        value={formik.values.description}
        onChangeText={formik.handleChange('description')}
      />
      <Button
        title={i18n.t('save')}
        onPress={formik.submitForm}
        disabled={!formik.isValid}
      />
    </View>
  );
}

export default ExerciseEditorForm;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
  },
  restSlider: {
    margin: 10,
  },
});

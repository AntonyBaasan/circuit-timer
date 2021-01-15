import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Text } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { ScreenNames } from '../../../constants/Screen';
import { getBase64TypePrefix } from '../../../helpers/imageUtility';
import { Exercise, ExerciseMetadataStatus } from '../../../models/Exercise';
import { removeExercises } from '../../../store/exercise/actions';

type ExerciseListProps = {
  navigation: any;
  workoutId: string;
  exercises: Exercise[];
  reordered: (exercises: Exercise[])=>void;
};

function ExerciseList(props: ExerciseListProps) {
  const { workoutId, exercises, navigation, reordered } = props;
  const dispatch = useDispatch();

  const allVisibleExercises = exercises.filter(
    (e) => e.metadata.status !== ExerciseMetadataStatus.Deleted
  );
  const clickAddExercise = (order: number) => {
    navigation.navigate(ScreenNames.ExerciseEditorScreen, {
      workoutId,
      order,
      exercise: null,
    });
  };

  const clickDeleteExercise = (exercise: Exercise) => {
    dispatch(removeExercises(workoutId, exercise.id));
  };

  const clickEditExercise = (exercise: Exercise, order: number) => {
    navigation.navigate(ScreenNames.ExerciseEditorScreen, {
      workoutId,
      order,
      exercise,
    });
  };

  const renderExerciseList = () => {
    return allVisibleExercises.map((e, index) => {
      return (
        <View key={e.id} style={styles.listItem}>
          {e.images && e.images.length > 0 && (
            <Image
              style={styles.image}
              source={{
                uri:
                  getBase64TypePrefix(e.images[0].extension) +
                  e.images[0].base64,
              }}
            />
          )}
          <Button
            style={styles.titleButton}
            onPress={() => clickEditExercise(e, index)}
          >
            {e.title}
          </Button>
          <Button
            style={styles.deleteButton}
            onPress={() => clickDeleteExercise(e)}
          >
            X
          </Button>
        </View>
      );
    });
  };
  const renderExerciseList2 = () => {
    return (
      <DraggableFlatList
        style={{ width: '100%', backgroundColor: 'yellow' }}
        data={allVisibleExercises}
        renderItem={renderExerciseItem}
        keyExtractor={(item, index) => `draggable-item-${item.id}`}
        onDragEnd={({ data }) => reordered(data)}
      />
    );
  };
  const renderExerciseItem = ({ item, index, drag, isActive }: any) => {
    return (
      <View style={styles.listItem}>
        <TouchableOpacity style={styles.listItemDragPin} onPressIn={drag}>
          <Text>###</Text>
        </TouchableOpacity>
        <Text style={styles.listItemText}>{item.title}(order:{item.order})</Text>
        <Button
          style={styles.deleteButton}
          onPress={() => clickDeleteExercise(item)}
        >
          X
        </Button>
      </View>
    );
  };

  const renderAddNewButton = (index: number) => {
    return (
      <View style={styles.listItem}>
        <Button
          style={styles.addButton}
          labelStyle={styles.addButtonLabel}
          onPress={() => clickAddExercise(index)}
        >
          +
        </Button>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderAddNewButton(0)}
      {renderExerciseList()}
      {renderExerciseList2()}
      {allVisibleExercises?.length > 0 &&
        renderAddNewButton(allVisibleExercises.length)}
    </View>
  );
}

export default ExerciseList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  listItemDragPin: {
    height: 40,
    width: 40,
    backgroundColor: 'red',
  },
  listItemText: {
    flex: 1,
    backgroundColor: 'grey',
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
  titleButton: {
    width: 250,
    borderWidth: 1,
    borderColor: 'black',
    margin: 5,
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: 'red',
    margin: 5,
  },
  image: {
    width: 40,
    height: 40,
    margin: 5,
  },
});

import React, { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import i18n from 'i18n-js';
import { ThemeProvider, Button } from 'react-native-elements';
import {
  HeaderButtons,
  HiddenItem,
  Item,
} from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import { ScreenNames } from '../../constants/Screen';
import { Exercise } from '../../models/exercise';
import { DEMO_EXERCISE } from '../../data/example';
import { mainTheme } from '../../constants/theme/Main';
import ExerciseListItem from './ExerciseListItem';
import { CustomHeaderButton } from '../../components/navigation/HeaderButtons';
import { RootState } from '../../store/models';

type ExerciseListProps = { navigation: any };

function ExerciseListScreen(props: ExerciseListProps) {
  const exercises = useSelector((state: RootState) => state.exercise.exercises);

  const onChooseCreateScreen = () => {
    props.navigation.navigate(ScreenNames.ChooseCreateScreen);
  };

  const onStartExercise = (itemId: string) => {
    props.navigation.navigate(ScreenNames.ExercisePlayerScreen, {
      exerciseId: itemId,
    });
  };

  const onShowExerciseDetail = (itemId: string) => {
    props.navigation.navigate(ScreenNames.ExerciseDetailScreen, {
      exerciseId: itemId,
    });
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title={i18n.t('add_exercise')}
            iconName="ios-add-circle-outline"
            onPress={onChooseCreateScreen}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  const renderExerciseItem = ({ item }: { item: Exercise }) => {
    return (
      <ExerciseListItem
        item={item}
        clickStart={onStartExercise.bind(this, item.id)}
        clickDetails={onShowExerciseDetail.bind(this, item.id)}
      />
    );
  };

  const keyExtractor = (item: Exercise) => item.id;

  return (
    <ThemeProvider theme={mainTheme}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={exercises}
          renderItem={renderExerciseItem}
          keyExtractor={keyExtractor}
        />
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default ExerciseListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import * as React from 'react';
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
type ExerciseListState = { exercises: Exercise[]; theme: any };

class ExerciseListScreen extends React.PureComponent<
  ExerciseListProps,
  ExerciseListState
> {
  constructor(props: ExerciseListProps) {
    super(props);

    const allExercises = useSelector((state:RootState)=>state.exercise.exercises);

    this.state = {
      exercises: DEMO_EXERCISE,
      theme: mainTheme,
    };
    this.setTabHeader();
  }

  private setTabHeader() {
    const { navigation } = this.props;
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title={i18n.t('add_exercise')}
            iconName="ios-add-circle-outline"
            onPress={this.onChooseCreateScreen}
          />
        </HeaderButtons>
      ),
    });
  }

  onChooseCreateScreen = () => {
    this.props.navigation.navigate(ScreenNames.ChooseCreateScreen);
  };

  onStartExercise = (itemId: string) => {
    this.props.navigation.navigate(ScreenNames.ExercisePlayerScreen, {
      exerciseId: itemId,
    });
  };

  onShowExerciseDetail = (itemId: string) => {
    this.props.navigation.navigate(ScreenNames.ExerciseDetailScreen, {
      exerciseId: itemId,
    });
  };

  renderExerciseItem = ({ item }: { item: Exercise }) => {
    return (
      <ExerciseListItem
        item={item}
        clickStart={this.onStartExercise.bind(this, item.id)}
        clickDetails={this.onShowExerciseDetail.bind(this, item.id)}
      />
    );
  };

  keyExtractor = (item: Exercise) => item.id;

  render() {
    return (
      <ThemeProvider theme={mainTheme}>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={this.state.exercises}
            renderItem={this.renderExerciseItem}
            keyExtractor={this.keyExtractor}
          />
        </SafeAreaView>
      </ThemeProvider>
    );
  }
}

export default ExerciseListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

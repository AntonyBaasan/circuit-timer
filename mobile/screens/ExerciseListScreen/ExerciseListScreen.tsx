import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import i18n from 'i18n-js';
import { ThemeProvider, Button, Card, Icon } from 'react-native-elements';

import { ScreenNames } from '../../constants/Screen';
import { Text, View } from '../../components/Themed';
import { Exercise } from '../../models/exercise';
import { demoExercises } from '../../data/example';
import { mainTheme } from '../../constants/theme/Main';

type ExerciseListProps = { navigation: any };
type ExerciseListState = { exercises: Exercise[]; theme: any };

class ExerciseListScreen extends React.PureComponent<
  ExerciseListProps,
  ExerciseListState
> {
  constructor(props: ExerciseListProps) {
    super(props);

    this.state = {
      exercises: demoExercises,
      theme: mainTheme,
    };
    this.setTabHeader();

    this.renderExerciseItem.bind(this);
  }

  setTabHeader() {
    const { navigation } = this.props;
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            this.props.navigation.navigate(ScreenNames.ChooseCreateScreen);
          }}
          title={i18n.t('add_exercise')}
        />
      ),
    });
  }

  renderExerciseItem = ({ item }: { item: Exercise }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate(ScreenNames.ExerciseDetailScreen);
        }}
      >
        <Card>
          <Card.Title numberOfLines={1}>{item.title}</Card.Title>
          <Card.Divider />
          <Text style={{ marginBottom: 10 }}>{item.description}</Text>
          <Card.Divider />
          <View style={styles.buttonRow}>
            <Button
              icon={
                <Icon
                  name="play-circle-outline"
                  color="#ffffff"
                  type="evilicons"
                />
              }
              buttonStyle={styles.buttonStyle}
              title={i18n.t('start')}
              onPress={() => {
                this.props.navigation.navigate(
                  ScreenNames.ExercisePlayerScreen,
                  {
                    exercise: item,
                  }
                );
              }}
            />
          </View>
        </Card>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <ThemeProvider theme={mainTheme}>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={this.state.exercises}
            renderItem={this.renderExerciseItem}
            keyExtractor={(item) => item.id}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  remainingTime: {
    fontSize: 46,
  },
  buttonRow: {
    flexDirection: 'row-reverse',
  },
  buttonStyle: {
    borderRadius: 0,
    marginLeft: 5,
    marginRight: 0,
    marginBottom: 0,
  },
});

import * as React from 'react';
import { StyleSheet, Animated } from 'react-native';

import { Text, View } from '../components/Themed';
import { Exercise } from '../models/exercise';
import { ThemeProvider, Button, Card, Icon } from 'react-native-elements';
import { getDefaultExercises } from '../data/example';
const theme = {
  Button: {
    raised: true,
  },
};
type ExcerciseListProps = {};
type ExcerciseListState = { exercises: Exercise[] };
class ExcerciseListScreen extends React.PureComponent<
  ExcerciseListProps,
  ExcerciseListState
> {
  constructor(props: ExcerciseListProps) {
    super(props);

    this.state = {
      exercises: getDefaultExercises(),
    };
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <View style={styles.container}>
          {this.state.exercises.map((e) => {
            // <Card title={e.title} image={require('../images/pic2.jpg')}>
            <Card title={e.title}>
              <Text style={{ marginBottom: 10 }}>
                The idea with React Native Elements is more about component
                structure than actual design.
              </Text>
              <Button
                icon={<Icon name="code" color="#ffffff" />}
                buttonStyle={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                }}
                title="VIEW NOW"
                onPress={() => {
                  this.props.navigation.navigate('ExerciseScreen');
                }}
              />
            </Card>;
          })}

          <Text style={styles.title}>Hello world</Text>
          <Button
            title="Go To Exercise"
            onPress={() => {
              this.props.navigation.navigate('ExerciseScreen');
            }}
          />
        </View>
      </ThemeProvider>
    );
  }
}

export default ExcerciseListScreen;

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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  remainingTime: {
    fontSize: 46,
  },
});

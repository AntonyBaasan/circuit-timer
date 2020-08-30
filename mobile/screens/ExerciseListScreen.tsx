import * as React from "react";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";

import { Text, View } from "../components/Themed";
import { Exercise } from "../models/exercise";
import { ThemeProvider, Button, Card, Icon } from "react-native-elements";
import { demoExercises } from "../data/example";
import { mainTheme } from "../constants/theme/main-theme";

type ExerciseListProps = { navigation: any };
type ExerciseListState = { exercises: Exercise[], theme: any };

class ExerciseListScreen extends React.PureComponent<
  ExerciseListProps,
  ExerciseListState
> {
  constructor(props: ExerciseListProps) {
    super(props);

    this.state = {
      exercises: demoExercises,
      theme: mainTheme
    };
    this.setTabHeader();

    this.renderExerciseItem.bind(this);
  }

  setTabHeader() {
    const { navigation } = this.props;
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => alert("hi")} title="Add Exercise" />
      ),
    });
  }

  renderExerciseItem = ({ item }: {item: Exercise}) => {
    return (
      <Card key={item.id} title={item.title}>
        <Text style={{ marginBottom: 10 }}>{item.description}</Text>
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
            title="Start"
            onPress={() => {
              this.props.navigation.navigate("ExcercisePlayer", {
                exercise: item,
              });
            }}
          />
        </View>
      </Card>
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
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  remainingTime: {
    fontSize: 46,
  },
  buttonRow: {
    flexDirection: "row-reverse",
  },
  buttonStyle: {
    borderRadius: 0,
    marginLeft: 5,
    marginRight: 0,
    marginBottom: 0,
  },
});

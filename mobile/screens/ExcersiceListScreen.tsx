import * as React from 'react';
import { StyleSheet, Button, Animated } from 'react-native';

import { Text, View } from '../components/Themed';
import { Exercise } from '../models/exercise';

type ExcerciseListProps = {};
type ExcerciseListState = {};
class ExcerciseListScreen extends React.PureComponent<ExcerciseListProps, ExcerciseListState> {
  
  constructor(props: ExcerciseListProps) {
    super(props);
    
    this.state = {
      excercises: [],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hello world</Text>
        <Button 
          title='Go To Exercise'
          onPress={()=>{
            this.props.navigation.navigate('ExerciseScreen');
          }}/>
      </View>
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

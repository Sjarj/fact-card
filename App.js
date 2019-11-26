import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FactCard from './components/fact-card';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={style.container}>
        <Text style={style.title}>Fact Swipe</Text>
        <FactCard />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 50
  },
  title: {
    fontSize: 30
  }
});

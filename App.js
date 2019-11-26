import React from 'react';
import { StyleSheet, Animated, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.position = new Animated.ValueXY(0, 0);
    Animated.spring(this.position, { toValue: { x: 200, y: 300 } }).start();
  }
  render() {
    return (
      <Animated.View style={this.position.getLayout()}>
        <View style={style.square} />
      </Animated.View>
    );
  }
}

const style = StyleSheet.create({
  square: {
    width: 100,
    height: 100,
    backgroundColor: `red`
  }
});

import React from 'react';
import { StyleSheet, Text, View, Animated, PanResponder } from 'react-native';
import FactCard from './components/fact-card';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { panResponder: undefined };
    this.position = new Animated.ValueXY();
  }

  componentDidMount = () => {
    const panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        this.position.setValue({
          x: gesture.dx,
          y: gesture.dy
        });
      }
    });
    this.setState({ panResponder });
  };

  getCardStyle = () => {
    const rotation = this.position.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ['-120deg', '0deg', '120deg']
    });
    return {
      transform: [{ rotate: rotation }],
      ...this.position.getLayout()
    };
  };

  render() {
    return (
      <View style={style.container}>
        <Text style={style.title}>Fact Swipe</Text>
        {this.state.panResponder && (
          <Animated.View
            {...this.state.panResponder.panHandlers}
            style={this.getCardStyle()}
          >
            <FactCard />
          </Animated.View>
        )}
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
    fontSize: 30,
    marginBottom: hp('10%')
  }
});

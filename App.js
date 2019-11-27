import React from 'react';
import { StyleSheet, Text, View, Animated, PanResponder } from 'react-native';
import FactCard from './components/fact-card';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const CARD_X_ORIGIN = wp('0%');
const MAX_LEFT_ROTATION_DISTANCE = wp('-150%');
const MAX_RIGHT_ROTATION_DISTANCE = wp('150%');
const LEFT_TRESHOLD_BEFORE_SWIPE = wp('-50%');
const RIGHT_TRESHOLD_BEFORE_SWIPE = wp('50%');

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
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx < LEFT_TRESHOLD_BEFORE_SWIPE) {
          this.forceLeftExit();
        }
        if (gesture.dx > RIGHT_TRESHOLD_BEFORE_SWIPE) {
          this.forceRightExit();
        } else {
          this.resetPositionSoft();
        }
      }
    });
    this.setState({ panResponder });
  };

  forceLeftExit = () => {
    Animated.timing(this.position, {
      toValue: { x: wp('-100%'), y: 0 }
    }).start();
  };
  forceRightExit = () => {
    Animated.timing(this.position, {
      toValue: { x: wp('100%'), y: 0 }
    }).start();
  };

  resetPositionSoft = () => {
    Animated.spring(this.position, { toValue: { x: 0, y: 0 } }).start();
  };

  getCardStyle = () => {
    const rotation = this.position.x.interpolate({
      inputRange: [
        MAX_LEFT_ROTATION_DISTANCE,
        CARD_X_ORIGIN,
        MAX_RIGHT_ROTATION_DISTANCE
      ],
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

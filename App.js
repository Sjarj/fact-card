import React from 'react';
import { StyleSheet, Text, View, Animated, PanResponder } from 'react-native';

import FactCard from './components/fact-card';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import axios from 'axios';

const MAX_LEFT_ROTATION_DISTANCE = wp('-150%');
const MAX_RIGHT_ROTATION_DISTANCE = wp('150%');
const LEFT_TRESHOLD_BEFORE_SWIPE = wp('-50%');
const RIGHT_TRESHOLD_BEFORE_SWIPE = wp('50%');
const RANDOM_FACT_URL =
  'http://randomuselessfact.appspot.com/random.json?language=en';
const PICTURE_LIST_URL = `https://picsum.photos/${hp('30%')}/${wp(
  '90%'
)}?image=`;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      panResponder: undefined,
      topFact: undefined,
      bottomFact: undefined
    };
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
        } else if (gesture.dx > RIGHT_TRESHOLD_BEFORE_SWIPE) {
          this.forceRightExit();
        } else {
          this.resetPositionSoft();
        }
      }
    });
    this.setState({ panResponder }, () => {
      axios.get(RANDOM_FACT_URL).then(response => {
        this.setState({
          topFact: { ...response.data, image: this.getRandomImageUrl() }
        });
      });
      axios.get(RANDOM_FACT_URL).then(response => {
        this.setState({
          bottomFact: { ...response.data, image: this.getRandomImageUrl() }
        });
      });
    });
  };

  getRandomImageUrl = () => {
    return `${PICTURE_LIST_URL}${Math.floor(Math.random() * 500 + 1)}`;
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
      inputRange: [MAX_LEFT_ROTATION_DISTANCE, 0, MAX_RIGHT_ROTATION_DISTANCE],
      outputRange: ['-120deg', '0deg', '120deg']
    });
    return {
      ...this.position.getLayout(),
      transform: [{ rotate: rotation }]
    };
  };

  renderTopCard = () => {
    return (
      <Animated.View
        {...this.state.panResponder.panHandlers}
        style={this.getCardStyle()}
      >
        <FactCard disabled={false} fact={this.state.topFact} />
      </Animated.View>
    );
  };
  renderBottomCard = () => {
    return (
      <View style={{ zIndex: -1, position: 'absolute' }}>
        <FactCard disabled={true} fact={this.state.bottomFact} />
      </View>
    );
  };

  render() {
    return (
      <View style={style.container}>
        <Text style={style.title}>Fact Swipe</Text>
        <View>
          {this.state.topFact && this.renderTopCard()}
          {this.state.bottomFact && this.renderBottomCard()}
        </View>
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

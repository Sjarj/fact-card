import React from 'react';
import { StyleSheet, Animated, View } from 'react-native';

export default function App() {
  return <View style={style.square} />;
}

const style = StyleSheet.create({
  square: {
    width: 100,
    height: 100,
    backgroundColor: `red`
  }
});

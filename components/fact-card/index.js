import React, { Component } from 'react';
import { Text, View, Image, Button } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default class FactCard extends Component {
  render() {
    return (
      <View
        style={{
          elevation: 1,
          shadowColor: 'black',
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.7,
          width: wp('90%'),
          backgroundColor: 'white'
        }}
      >
        <Image
          style={{ width: wp('90%'), height: hp('30%') }}
          source={{
            uri: `https://picsum.photos/${hp('30%')}/300`
          }}
        />
        <Text>ommgifjgigjrpijferpg idjfidfjeiaorjfaoezfj idf</Text>
        <Button
          title='See the source'
          onPress={() => {
            console.log('todo');
          }}
        />
      </View>
    );
  }
}

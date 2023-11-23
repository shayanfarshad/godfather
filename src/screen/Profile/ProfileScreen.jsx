import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../theme';

const ProfileScreen = () => {
  return (
    <View style={{flex:1,backgroundColor:colors.background}}>
      <Text>خوش اومدید</Text>
    </View>
  );
};

export {ProfileScreen};

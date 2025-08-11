import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {colors} from '../../theme';
import {useStore} from '../../constants/useStore';

const ProfileScreen = () => {
  const {
    themeStore: {isDark},
  } = useStore();

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <Text>خوش اومدید</Text>
    </View>
  );
};

export {ProfileScreen};

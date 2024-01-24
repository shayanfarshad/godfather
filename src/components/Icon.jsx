import React from 'react';
import I from 'react-native-vector-icons/FontAwesome';
import ExpoI from '@expo/vector-icons/FontAwesome';
import {Platform} from 'react-native';
export const Icon = ({name, size, color, style}) => {
  if (Platform.OS !== 'web') {
    return (
      <I
        name={name}
        size={size || 16}
        color={color || 'black'}
        style={style || []}
      />
    );
  } else {
    return (
      <ExpoI
        name={name}
        size={size || 16}
        color={color || 'black'}
        style={style || []}
      />
    );
  }
};

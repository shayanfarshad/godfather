import React from 'react';
import I from 'react-native-vector-icons/FontAwesome';

export const Icon = ({name, size, color, style}) => {
  return (
    <I
      name={name}
      size={size || 16}
      color={color || 'black'}
      style={style || []}
    />
  );
};

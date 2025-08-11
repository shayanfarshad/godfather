import React from 'react';
import I from 'react-native-vector-icons/FontAwesome';
import { TextStyle, StyleProp } from 'react-native';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}

export const Icon: React.FC<IconProps> = ({ name, size = 16, color = 'black', style }) => {
  return <I name={name} size={size} color={color} style={style as any} />; // Cast style as any
};

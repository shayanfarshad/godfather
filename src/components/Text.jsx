import React from 'react';
import {Text as T} from 'react-native';

export const Text = ({type = 'medium', children, style}) => {
  return <T style={[style, {fontFamily: font(type)}]}>{children}</T>;
};

const font = type => {
  switch (type) {
    case 'bold':
      return 'IRANSansXNoEn-Bold';
    case 'light':
      return 'IRANSansXNoEn-Light';
    default:
      return 'IRANSansXNoEn-Medium';
  }
};

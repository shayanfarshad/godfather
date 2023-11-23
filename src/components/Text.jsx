import React from 'react';
import {Text as T} from 'react-native';
import {colors} from '../theme';
import I18n from 'i18n-js';

// export const Text = ({type = 'medium', children, style, ...restProps}) => {
//   return (
//     <T {...restProps} style={[style, {fontFamily: font(type)}]}>
//       {children}
//     </T>
//   );
// };

const Text = ({style, type = 'medium', numberOfLines, ...restProps}) => {
  // Define your custom styles here, you can use style prop as well
  const customStyles = {
    fontSize: 16,
    // color: 'blue',
    // Add any other custom styles you need
  };

  // Combine the standard style prop and the custom styles
  const combinedStyles = [customStyles, style];

  return (
    <T
      ellipsizeMode="tail"
      numberOfLines={numberOfLines || 0}
      style={[combinedStyles, {fontFamily: font(type), color: colors.text}]}
      {...restProps}>
      {restProps.children}
    </T>
  );
};

export const font = type => {
  console.log({locale: I18n.locale});
  if (I18n.locale === 'en-US') {
    switch (type) {
      case 'bold':
        return 'Wizard World';
      case 'light':
        return 'Wizard World';
      default:
        return 'Wizard World';
    }
  } else {
    switch (type) {
      case 'bold':
        return 'Nofar';
      case 'light':
        return 'Nofar';
      default:
        return 'Nofar';
    }
  }
};
export default Text;

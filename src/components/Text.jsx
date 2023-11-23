import React from 'react';
import {Text as T} from 'react-native';
import {colors} from '../theme';
import I18n from 'i18n-js';
import {useStore} from '../constants/useStore';
import {observer} from 'mobx-react';

// export const Text = ({type = 'medium', children, style, ...restProps}) => {
//   return (
//     <T {...restProps} style={[style, {fontFamily: font(type)}]}>
//       {children}
//     </T>
//   );
// };

const Text = observer(
  ({style, type = 'medium', numberOfLines, ...restProps}) => {
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
        style={[
          combinedStyles,
          {fontFamily: font(type), color: colors.text, lineHeight: 40},
        ]}
        {...restProps}>
        {restProps.children}
      </T>
    );
  },
);

export const font = type => {
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
        return 'Digi Nofar Bold';
      case 'light':
        return 'Digi Nofar Bold';
      default:
        return 'Digi Nofar Bold';
    }
  }
};
export default Text;

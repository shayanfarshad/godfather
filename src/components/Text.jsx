import React, {useEffect} from 'react';
import {Platform, Text as T, useColorScheme} from 'react-native';
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
    const {
      langStore: {language},
    } = useStore();
    const colorScheme = useColorScheme() === 'dark';
    // Define your custom styles here, you can use style prop as well
    const customStyles = {
      fontSize: I18n.locale === 'en-IR' ? 20 : 16,
      color: restProps?.color || colorScheme ? colors.text : colors.text,
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
          {
            fontFamily: font(type, language),
            textAlign: 'right',
            paddingTop: Platform.OS === 'ios' ? 12 : 0,
            paddingBottom: Platform.OS === 'ios' ? 12 : 0,
            paddingHorizontal: Platform.OS === 'ios' ? 12 : 0,
            // padding: Platform.OS === 'ios' ? 12 : 0,
          },
        ]}
        {...restProps}>
        {restProps.children}
      </T>
    );
  },
);

export const font = (type, language) => {
  if (language === 'en') {
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
      case 'iran':
        return 'IRANSansXNoEn-Medium';
      default:
        return 'Digi Nofar Bold';
    }
  }
};
export default Text;

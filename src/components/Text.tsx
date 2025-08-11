import React from 'react';
import {
  Platform,
  Text as RNText,
  TextProps,
  TextStyle,
  useColorScheme,
} from 'react-native';
import {colors} from '../theme';
import I18n from 'i18n-js';
import {useAppSelector} from '../stores/hooks';
import {shallowEqual} from 'react-redux';

// Define the prop types for the Text component
interface CustomTextProps extends TextProps {
  type?: 'bold' | 'light' | 'medium' | 'iran'; // Define allowed values for `type`
  style?: TextStyle; // Accept a TextStyle or array of TextStyles
  numberOfLines?: number; // Optional prop for numberOfLines
}

const Text: React.FC<CustomTextProps> = ({
  type = 'medium',
  style,
  numberOfLines,
  ...restProps
}) => {
  const language = useAppSelector(state => state.App.language, shallowEqual);
  const colorScheme = useColorScheme() === 'dark';

  // Define custom styles, fallback to the system theme colors
  const customStyles: TextStyle = {
    fontSize: I18n.locale === 'en-IR' ? 20 : 16,
    color: style?.color || (colorScheme ? colors.text : colors.text), // Set color based on the theme
  };

  // Combine provided styles and custom styles
  const combinedStyles = [customStyles, style];

  return (
    <RNText
      ellipsizeMode="tail"
      numberOfLines={numberOfLines || 0} // Default to 0 (unlimited lines)
      style={[
        combinedStyles,
        {
          fontFamily: font(type, language),
          textAlign: language === "fa" ?'right':'left',
          // paddingTop: Platform.OS === 'ios' ? 5 : 0,
          // paddingBottom: Platform.OS === 'ios' ? 12 : 0,
          // paddingHorizontal: Platform.OS === 'ios' ? 12 : 0,
        },
      ]}
      {...restProps}>
      {restProps.children}
    </RNText>
  );
};
// Font function to return the correct font family based on `type` and `language`
export const font = (type: string, language: string): string => {
  if (language === 'en') {
    switch (type) {
      case 'bold':
        return 'Wizard World Bold';
      case 'light':
        return 'Wizard World Light';
      default:
        return 'Wizard World Medium';
    }
  } else {
    switch (type) {
      case 'bold':
        return 'IRANSansXNoEn-Bold';
      case 'light':
        return 'IRANSansXNoEn-Light';
      case 'iran':
        return 'IRANSansXNoEn-Iran';
      default:
        return 'IRANSansXNoEn-Medium';
    }
  }
};

export default Text;

import {Toast} from 'react-native-toast-notifications';
import {colors} from '../theme';
import {DWidth} from '../constants/Constants';
import {useAppSelector} from '../stores/hooks';
import {shallowEqual} from 'react-redux';

// Define the types for the showToast function props
interface ShowToastProps {
  text: string;
  mode?: 'success' | 'normal' | 'warning' | 'danger';
  actions?: any; // If there are specific actions, define the type here
  duration?: number;
  onPress?: () => void;
  didFinished?: () => void;
  language?: string;
}

const showToast = ({
  text,
  mode = 'success',
  actions,
  duration = 3000,
  language,
  onPress = () => {},
  didFinished = () => {},
}: ShowToastProps): void => {
  const baseStyle = {
    width: DWidth * 0.9,
    borderRadius: 10,
    marginHorizontal: DWidth * 0.05,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const textStyle = {
    fontFamily: language === 'fa' ? 'Digi Nofar Bold' : 'Wizard World',
    fontSize: 20,
    color: colors.text,
  };

  // Render the toast based on the mode
  switch (mode) {
    case 'success':
      Toast.show(text, {
        placement: 'top',
        duration: duration,
        successColor: colors.bottomCenterColor,
        style: {
          width: DWidth * 0.9,
          borderRadius: 10,
          marginHorizontal: DWidth * 0.05,
          marginTop: 40,
          alignItems: 'center',
          justifyContent: 'center',
        },
        textStyle,
      });
      break;

    case 'normal':
      Toast.show(text, {
        placement: 'top',
        duration: duration,
        normalColor: colors.bottomCenterColor,
        style: {
          width: DWidth * 0.9,
          borderRadius: 10,
          marginHorizontal: DWidth * 0.05,
          marginTop: 40,
          alignItems: 'center',
          justifyContent: 'center',
        },
        textStyle,
      });
      break;

    case 'warning':
      Toast.show(text, {
        placement: 'top',
        duration: duration,
        type: mode,
        warningColor: colors.modalBackground,
        style: {
          width: DWidth * 0.9,
          borderRadius: 10,
          marginHorizontal: DWidth * 0.05,
          marginTop: 40,
          alignItems: 'center',
          justifyContent: 'center',
        },
        // style: {
        //   ...baseStyle,
        //   backgroundColor: colors.modalBackground,
        // },
        textStyle,
        // rtl: true,
      });
      break;

    case 'danger':
      Toast.show(text, {
        placement: 'top',
        duration: duration,
        type: mode,
        dangerColor: 'rgb(194, 45, 72)',
        style: {
          width: DWidth * 0.9,
          borderRadius: 10,
          marginHorizontal: DWidth * 0.05,
          marginTop: 40,
          alignItems: 'center',
          justifyContent: 'center',
        },
        textStyle,
      });
      break;

    default:
      break;
  }
};

export {showToast};

import Snackbar from 'react-native-snackbar';
import {useStore} from '../constants/useStore';
import {colors} from '../theme';

const showToast = ({
  text,
  mode = 'success',
  actions,
  duration = 12000,
  onPress = () => {},
  didFinished = () => {},
}) => {
  const {
    langStore: {language},
  } = useStore();
  switch (mode) {
    case 'success':
      return Snackbar.show({
        text: text,
        textColor: colors.text,
        backgroundColor: colors.modalBackground,
        duration: duration,
        fontFamily: language === 'fa' ? 'Digi Nofar Bold' : 'Wizard World',
        bottom: 50,
        action: actions,
        rtl: true,
        numberOfLines: 15,
      });

    case 'warn':
      return Snackbar.show({
        text: text,
        textColor: colors.text,
        backgroundColor: colors.modalBackground,
        duration: duration,
        fontFamily: language === 'fa' ? 'Digi Nofar Bold' : 'Wizard World',
        action: actions,
        rtl: language === 'fa' ? true : false,
        style: {position: 'absolute', top: 20},
      });

    case 'info':
      return Snackbar.show({
        text: text,
        textColor: colors.palette.primary300,
        backgroundColor: colors.palette.neutral200,
        duration: duration,
        fontFamily: language === 'fa' ? 'IRANSansXNoEn-Medium' : 'Wizard World',
        action: actions,
        rtl: language === 'fa' ? true : false,
        numberOfLines: 15,
      });

    case 'error':
      return Snackbar.show({
        text: text,
        textColor: colors.text,
        backgroundColor: colors.modalBackground,
        duration: duration,
        action: actions,
        fontFamily: language === 'fa' ? 'Digi Nofar Bold' : 'Wizard World',
        rtl: language === 'fa' ? true : false,
      });
  }
};

export {showToast};

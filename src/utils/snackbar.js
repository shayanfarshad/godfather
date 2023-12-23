// import Snackbar from 'react-native-snackbar';
import React from 'react';
import {Toast} from 'react-native-toast-notifications';

import {useStore} from '../constants/useStore';
import {colors} from '../theme';
import {DWidth} from '../constants/Constants';

const showToast = ({
  text,
  mode = 'success',
  actions,
  duration = 3000,
  onPress = () => {},
  didFinished = () => {},
}) => {
  const {
    langStore: {language},
  } = useStore();
  switch (mode) {
    case 'success':
      return Toast.show(text, {
        placement: 'top',
        duration: duration,
        style: {
          backgroundColor: colors.bottomCenterColor,

          width: DWidth * 0.9,
          borderRadius: 10,
          marginHorizontal: DWidth * 0.05,
          marginTop: 40,
          alignItems: 'center',
          justifyContent: 'center',
        },
        textStyle: {
          fontFamily: language === 'fa' ? 'Digi Nofar Bold' : 'Wizard World',
          fontSize: 20,
          color: colors.text,
        },
        rtl: true,
      });

    case 'normal':
      return Toast.show(text, {
        placement: 'top',
        duration: duration,
        style: {
          backgroundColor: colors.bottomCenterColor,

          width: DWidth * 0.9,
          borderRadius: 10,
          marginHorizontal: DWidth * 0.05,
          marginTop: 40,
          alignItems: 'center',
          justifyContent: 'center',
        },
        textStyle: {
          fontFamily: language === 'fa' ? 'Digi Nofar Bold' : 'Wizard World',
          fontSize: 20,
          color: colors.text,
        },
        rtl: true,
      });

    case 'warning':
      return Toast.show(text, {
        placement: 'top',
        duration: duration,
        type: mode,
        style: {
          backgroundColor: colors.modalBackground,
          width: DWidth * 0.9,
          borderRadius: 10,
          marginHorizontal: DWidth * 0.05,
          marginTop: 40,
          alignItems: 'center',
          justifyContent: 'center',
        },
        textStyle: {
          fontFamily: language === 'fa' ? 'Digi Nofar Bold' : 'Wizard World',
          fontSize: 20,
          color: colors.text,
        },
        rtl: true,
      });

    case 'danger':
      return Toast.show(text, {
        placement: 'top',
        duration: duration,
        type: mode,
        style: {
          backgroundColor: 'rgb(194, 45, 72)',
          width: DWidth * 0.9,
          borderRadius: 10,
          marginHorizontal: DWidth * 0.05,
          marginTop: 40,
          alignItems: 'center',
          justifyContent: 'center',
        },
        textStyle: {
          fontFamily: language === 'fa' ? 'Digi Nofar Bold' : 'Wizard World',
          fontSize: 20,
          color: colors.text,
        },
        rtl: true,
      });
  }
};

export {showToast};

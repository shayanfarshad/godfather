import React, {useEffect, useState} from 'react';
import Text from '../../components/Text';
import {View} from 'react-native';
import {colors} from '../../theme';
import {loadLocale, translate} from '../../i18n';
import {Radio} from '../../components/Radio';
import I18n from 'i18n-js';
import Header from '../../components/Header';
import fa from '../../i18n/fa';
import en from '../../i18n/en';

const SettingScreen = () => {
  const [selectedLang, setSelectedLang] = useState(null);
  const handlePress = option => {
    console.log({option, locale: I18n.locale});

    // setSelectedLang(option);
    if (option === 'persian') {
      I18n.locale = 'en-IR';
    } else {
      I18n.locale = 'en-US';
    }
  };
  // const getLocales = () => {
  //   loadLocale()
  //     .then(res => console.log({res}))
  //     .catch(err => console.log({err}));
  // };
  // useEffect(() => {
  //   getLocales();

  //   // console.log(I18n.currentLocale());
  // }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 20,
        paddingBottom: 40,
        paddingHorizontal: 20,
        backgroundColor: colors.background,
      }}>
      <Header title={translate('settings.title')} />
      <Text>{translate('settings.language')}</Text>
      <View style={{paddingHorizontal: 20}}>
        <Radio
          label={translate('settings.persian')}
          onPress={() => handlePress(translate('settings.persian'))}
          selected={selectedLang === translate('settings.persian')}
        />
        <Radio
          label={translate('settings.english')}
          onPress={() => handlePress(translate('settings.english'))}
          selected={selectedLang === translate('settings.english')}
        />
      </View>
    </View>
  );
};

export default SettingScreen;

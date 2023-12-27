import React, {useEffect, useState} from 'react';
import {Appearance, View} from 'react-native';
import {colors, spacing} from '../../theme';
import {changeLang, translate} from '../../i18n';
import {Radio} from '../../components/Radio';
import I18n from 'i18n-js';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import * as storage from '../../utils/storage';
import RNRestart from 'react-native-restart';
import Text from '../../components/Text';
import {useStore} from '../../constants/useStore';

const SettingScreen = observer(() => {
  const nav = useNavigation();
  const {
    themeStore: {setTheme, isDark},
  } = useStore();
  const getStoreTheme = async () => {
    await storage.load('theme').then(res => {
      if (res === 'light') {
        setSelectedMode('deactive');
      } else {
        setSelectedMode('active');
      }
    });
  };
  useEffect(() => {
    getStoreTheme();
  }, []);
  const [selectedLang, setSelectedLang] = useState(
    I18n.locale === 'en-IR' ? 'fa' : 'en',
  );
  const [selectedMode, setSelectedMode] = useState(
    isDark ? 'active' : 'deactive',
  );

  const handlePress = option => {
    if (option === 'Persian') {
      storage.save('language', 'en-IR');
      setSelectedLang('fa');
      changeLang('en-IR');
      RNRestart.restart();
    } else {
      storage.save('language', 'en-US');
      setSelectedLang('en');
      changeLang('en-US');
      RNRestart.restart();
    }
  };

  const handleNight = mode => {
    if (mode === 'active') {
      storage.save('theme', 'dark');
      Appearance.setColorScheme('dark');
      setTheme(true);
      setSelectedMode(mode);
    } else {
      storage.save('theme', 'light');
      Appearance.setColorScheme('light');
      setTheme(false);
      setSelectedMode(mode);
    }
  };

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
      <View style={{flexDirection: 'row-reverse'}}>
        <Text style={{fontSize: spacing.xl}}>
          {translate('settings.language')}
        </Text>
      </View>

      <View style={{paddingHorizontal: 20}}>
        <Radio
          label={translate('settings.persian')}
          onPress={() => handlePress(translate('settings.persian'))}
          selected={selectedLang === 'fa'}
        />
        <Radio
          label={translate('settings.english')}
          onPress={() => handlePress(translate('settings.english'))}
          selected={selectedLang === 'en'}
        />
      </View>
      <View style={{flexDirection: 'row-reverse'}}>
        <Text style={{fontSize: spacing.xl}}>
          {translate('settings.nightMode')}
        </Text>
      </View>

      <View style={{paddingHorizontal: 20}}>
        <Radio
          label={translate('settings.active')}
          onPress={() => handleNight('active')}
          selected={selectedMode === 'active'}
        />
        <Radio
          label={translate('settings.deactive')}
          onPress={() => handleNight('deactive')}
          selected={selectedMode === 'deactive'}
        />
      </View>
    </View>
  );
});

export default SettingScreen;

import React, {useEffect, useState} from 'react';
import {Appearance, useColorScheme, View} from 'react-native';
import {colors, spacing} from '../../theme';
import {Radio} from '../../components/Radio';
import Header from '../../components/Header';
import * as storage from '../../utils/storage';
import Text from '../../components/Text';
import i18next, {t} from 'i18next';
import {useAppDispatch, useAppSelector} from '../../stores/hooks';
import {shallowEqual} from 'react-redux';
import {AppActions} from '../../stores/slices';

const SettingScreen = () => {
  const [selectedLang, setSelectedLang] = useState(
    i18next.language === 'fa' ? 'fa' : 'en',
  );

  const dispatch = useAppDispatch();

  const {theme} = useAppSelector(state => state.App, shallowEqual);

  const [selectedMode, setSelectedMode] = useState(
    theme === "dark" ? 'active' : 'deactive',
  );

  const handlePress = (option: any) => {
    if (option === 'Persian') {
      setSelectedLang('fa');
      dispatch(AppActions.setLanguage('fa'));
      // RNRestart.restart();
    } else {
      setSelectedLang('en');
      dispatch(AppActions.setLanguage('en'));

      // RNRestart.restart();
    }
  };

  const handleNight = (mode: string) => {
    if (mode === 'active') {
      storage.save('theme', 'dark');
      Appearance.setColorScheme('dark');
      dispatch(AppActions.changeTheme('dark'));
      setSelectedMode(mode);
    } else {
      storage.save('theme', 'light');
      Appearance.setColorScheme('light');
      dispatch(AppActions.changeTheme('light'));
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
      <Header title={t('settings.title')} />
      <View style={{flexDirection: 'row-reverse'}}>
        <Text style={{fontSize: spacing.xl}}>{t('settings.language')}</Text>
      </View>

      <View style={{paddingHorizontal: 20}}>
        <Radio
          label={t('settings.persian')}
          onPress={() => handlePress(t('settings.persian'))}
          selected={selectedLang === 'fa'}
        />
        <Radio
          label={t('settings.english')}
          onPress={() => handlePress(t('settings.english'))}
          selected={selectedLang === 'en'}
        />
      </View>
      <View style={{flexDirection: 'row-reverse'}}>
        <Text style={{fontSize: spacing.xl}}>{t('settings.nightMode')}</Text>
      </View>

      <View style={{paddingHorizontal: 20}}>
        <Radio
          label={t('settings.active')}
          onPress={() => handleNight('active')}
          selected={selectedMode === 'active'}
        />
        <Radio
          label={t('settings.deactive')}
          onPress={() => handleNight('deactive')}
          selected={selectedMode === 'deactive'}
        />
      </View>
    </View>
  );
};

export default SettingScreen;

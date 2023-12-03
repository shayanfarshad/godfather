import React, {useEffect} from 'react';
import {Platform, Pressable, View, useColorScheme} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Text from './Text';
import {colors, spacing} from '../theme';
import {observer} from 'mobx-react';
import {useStore} from '../constants/useStore';

const Header = observer(({title, backPress}) => {
  const {
    themeStore: {isDark},
    langStore: {language},
  } = useStore();
  const colorScheme = useColorScheme() === 'dark';
  useEffect(() => {
    console.log({colorScheme});
  }, [colorScheme]);
  return (
    <View
      style={{
        flexDirection: 'row-reverse',
        height: 60,
        backgroundColor: colorScheme ? colors.background : colors.background,
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        marginBottom: 15,
        width: '100%',
        justifyContent: !backPress ? 'center' : 'space-between',
        paddingHorizontal: 15,
        alignItems: 'center',
      }}>
      {/* <View> */}
      <Text
        style={{
          fontSize: language === 'fa' ? spacing.xxl : spacing.xl,
          color: colors.text,
        }}>
        {'  '}
        {title}
        {'  '}
      </Text>
      {/* </View> */}
      {backPress && (
        <View
          style={{
            width: 50,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Pressable
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={backPress}>
            <Icon
              name={language === 'fa' ? 'chevron-left' : 'chevron-right'}
              size={25}
              color={colors.text}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
});

export default Header;

import React from 'react';
import {Platform, Pressable, View, useColorScheme} from 'react-native';
import Text from './Text';
import {colors, spacing} from '../theme';
import {observer} from 'mobx-react';
import {useStore} from '../constants/useStore';
import {Icon} from './Icon';

const Header = observer(({title, backPress}) => {
  const {
    themeStore: {isDark},
    langStore: {language},
  } = useStore();
  const colorScheme = useColorScheme() === 'dark';
  // useEffect(() => {
  //   // console.log({colorScheme});
  // }, [colorScheme]);
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
      <View
        style={{
          width: '80%',
          justifyContent: 'center',
          height: language === 'fa' ? '80%' : '100%',
          alignSelf: language === 'fa' ? 'flex-end' : 'center',
        }}>
        <Text
          style={{
            fontSize: spacing.xl,
            color: colors.text,
          }}>
          {'  '}
          {title}
          {'  '}
        </Text>
      </View>
      {backPress && (
        <View
          style={{
            width: '20%',
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
              name={
                language === 'fa'
                  ? 'chevron-left'
                  : Platform.OS !== 'web'
                  ? 'chevron-right'
                  : 'chevron-left'
              }
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

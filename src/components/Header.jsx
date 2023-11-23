import React from 'react';
import {Pressable, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Text from './Text';
import { colors } from '../theme';

const Header = ({title, backIcon, backPress}) => {
  return (
    <View
      style={{
        flexDirection: backIcon && 'row-reverse',
        height: 45,
        marginTop: 40,
        width: '100%',
        justifyContent: backPress ? 'space-between' : 'center',
        paddingHorizontal: 15,
        alignItems: 'center',
      }}>
      <View>
        <Text style={{fontSize: 25, color: colors.text}}>{title}</Text>
      </View>
      <View style={{width: 50, alignItems: 'center'}}>
        <Pressable onPress={backPress}>
          <Icon name={backIcon} size={25} color={'white'} />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;

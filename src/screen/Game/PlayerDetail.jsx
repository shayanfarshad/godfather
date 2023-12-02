import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {DWidth} from '../../constants/Constants';
import Text from '../../components/Text';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../theme';
import {translate} from '../../i18n';
import {showToast} from '../../utils/snackbar';

const PlayerDetail = ({
  index,
  setDetailPlayer,
  setShowModal,
  item,
  setRemovePlayer,
  showRole,
}) => {
  const [isSilent, setSilent] = useState(false);
  const [isShot, setShot] = useState(false);
  // const [hasShield, setHasShield] = useState(item.role.shield);
  const [hasAbility, setHasAbility] = useState(true);

  return (
    <View
      style={[
        styles.renderItem,
        {
          backgroundColor: colors.cardBackground,
        },
      ]}
      key={index}>
      <Pressable
        onPress={() => {
          setDetailPlayer(item);
          setShowModal(true);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
          width: '28%',
          height: 60,
        }}>
        {item?.role?.shield ? (
          <View
            style={{
              position: 'absolute',
              top: -30,
              right: -10,
              zIndex: 10,
              backgroundColor: colors.special,
              borderRadius: 10,
              padding: 5,
            }}>
            <Icon name={'shield'} color={colors.text} size={20} />
          </View>
        ) : null}
        <Image
          source={
            showRole
              ? item.role.image
              : require('../../assets/images/player2.png')
          }
          resizeMode="contain"
          style={{width: 60, height: 60, borderRadius: 10}}
        />
        <Text style={{fontSize: 18}}>{item.player.name}</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setSilent(!isSilent);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
          height: 60,
        }}>
        <Icon
          name={isSilent ? 'volume-off' : 'volume-up'}
          color={colors.text}
          size={30}
        />
        <Text>
          {isSilent ? translate('game.silent') : translate('game.speak')}
        </Text>
      </Pressable>

      <View
        onPress={() => {
          setSilent(!isSilent);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
          height: 60,
        }}></View>

      <Pressable
        onPress={() => {
          setHasAbility(!hasAbility);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
          height: 60,
        }}>
        <Icon
          name={'ban'}
          color={hasAbility ? colors.textDim : colors.text}
          size={30}
        />
        <Text style={{color: hasAbility ? colors.textDim : colors.text}}>
          {translate('game.disability')}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => {
          setRemovePlayer(item);
          showToast({
            mode: 'info',
            text: 'بازیکن از بازی خارج شد،در صورتی که کنستانتین نباشد و کنستانتین خارج هم نشده باشد می توانید بازیکن را به بازی برگردانید',
          });
          // setDead(!isDead);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
          height: 60,
        }}>
        <Icon name={'trash'} color={colors.text} size={30} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  renderItem: {
    // width: DWidth * 0.9,
    height: 120,
    marginBottom: 10,
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export {PlayerDetail};

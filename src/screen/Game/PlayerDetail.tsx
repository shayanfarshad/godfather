import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import Text from '../../components/Text';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../theme';
import {showToast} from '../../utils/snackbar';
import {t} from 'i18next';

const PlayerDetail = ({
  index,
  setDetailPlayer,
  setShowModal,
  item,
  setRemovePlayer,
  showRole,
}: any) => {
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
        <Text>{isSilent ? t('game.silent') : t('game.speak')}</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          setSilent(!isSilent);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
          height: 60,
        }}></Pressable>

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
          {t('game.disability')}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => {
          setRemovePlayer(item);
          showToast({
            mode: 'normal',
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

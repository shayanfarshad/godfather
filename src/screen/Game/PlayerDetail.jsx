import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {DWidth} from '../../constants/Constants';
import Text from '../../components/Text';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  const [hasShield, setHasShield] = useState(item.role.shield);
  const [hasAbility, setHasAbility] = useState(true);

  return (
    <View style={[styles.renderItem]} key={index}>
      <Pressable
        onPress={() => {
          setDetailPlayer(item);
          setShowModal(true);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
          width: '25%',
          height: 60,
        }}>
        <Image
          source={
            showRole
              ? item.role.image
              : require('../../assets/images/player2.png')
          }
          resizeMode="contain"
          style={{width: 50, height: 50, borderRadius: 10}}
        />
        <Text style={{color: 'white'}}>{item.player.name}</Text>
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
          color="white"
          size={30}
        />
        <Text style={{color: 'white'}}>{isSilent ? 'سکوت' : 'صحبت کن'}</Text>
      </Pressable>

      <View
        onPress={() => {
          setSilent(!isSilent);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
          height: 60,
        }}>
        {hasShield ? (
          <>
            <Icon name={'shield'} color="white" size={30} />
            <Text style={{color: 'white'}}>شیلد</Text>
          </>
        ) : null}
      </View>

      <Pressable
        onPress={() => {
          setHasAbility(!hasAbility);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
          height: 60,
        }}>
        <Icon name={'ban'} color={hasAbility ? '#6b6b6b' : 'white'} size={30} />
        <Text style={{color: hasAbility ? '#6b6b6b' : 'white'}}>بی خاصیت</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          setRemovePlayer(item);
          // setDead(!isDead);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
          height: 60,
        }}>
        <Icon name={'trash'} color="white" size={30} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  renderItem: {
    width: DWidth * 0.9,
    height: 80,
    marginBottom: 15,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export {PlayerDetail};

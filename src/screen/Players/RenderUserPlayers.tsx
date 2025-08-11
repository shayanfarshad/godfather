import React, {memo, useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import Text from '../../components/Text';
import {hp, wp} from '../../constants/Constants';
import {Player} from '../../stores/slices';
import {Icon} from '../../components/Icon';
import {useAppSelector} from 'src/stores/hooks';

interface IPlayers {
  item: Player;
  selectPlayer: (item: Player) => void;
  gamers: any;
}

const RenderUserPlayers = ({
  item,
  selectPlayer,
  gamers,
}: {
  item: any;
  selectPlayer: (item: any) => void;
  gamers: any;
}) => {
  console.log({item});
  const [selected, setSelected] = useState<boolean>(false);

  useEffect(() => {
    gamers.forEach((el: any) => {
      if (el.id === item.id) {
        setSelected(true);
      }
    });
  }, [gamers]);
  return (
    <Pressable
      style={styles.playerIcon}
      key={item.id}
      onPress={() => {
        if (selected) {
          setSelected(false);
        } else {
          setSelected(true);
        }
        selectPlayer(item);
      }}>
      <Image
        source={
          item?.avatar
            ? {uri: item.avatar}
            : require('../../assets/images/player2.png')
        }
        style={{width: wp(20), height: wp(20), borderRadius: 10}}
      />
      <Text>{item.name}</Text>

      {selected && (
        <Icon
          name="check-circle"
          size={hp(3)}
          color="green"
          style={styles.selected}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  playerIcon: {
    width: wp(32),
    height: hp(14),
    marginBottom: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selected: {
    position: 'absolute',
    zIndex: 10,
    right: wp(4),
  },
});
export default memo(RenderUserPlayers);

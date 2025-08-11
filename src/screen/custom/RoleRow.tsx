/**
 * @format
 * @flow strict-local
 */
import React, {useEffect, useRef} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import Text from '../../components/Text';
import {colors} from '../../theme';
import I from 'react-native-vector-icons/FontAwesome5';
import {Icon} from '../../components/Icon';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import mafiarole from '../../assets/images/mafiarole.png';
import citizenrole from '../../assets/images/citizenrole.png';
import {Modal} from '../../components/Modal';
import { DHeight } from '../../constants/Constants';

const RoleRow = ({item, removeItem}: any) => {
  const showCardRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    console.log({item: item.title});
  }, []);

  return (
    <Pressable
      onPress={() => showCardRef?.current?.present()}
      style={{
        flexDirection: 'row-reverse',
        alignItems: 'center',
        height: 70,
        justifyContent: 'space-between',
        marginBottom: 10,
        marginHorizontal: 15,
        padding: 10,
        backgroundColor: colors.cardBackground,
        borderRadius: 10,
      }}>
      <View style={{flexDirection: 'row-reverse', alignItems: 'center'}}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
          <I name="theater-masks" color={colors.text} size={25} />
        </View>
        <View style={{marginRight: 10}}>
          <Text style={{}}>{item?.title}</Text>
        </View>
      </View>
      <View>
        <Pressable
          style={{
            width: 60,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={removeItem}>
          <Icon name="trash" size={30} color={colors.text} />
        </Pressable>
      </View>
      <Modal
        modalRef={showCardRef}
        index={0}
        onDismiss={() => {}}
        snapPoints={[DHeight * 0.4]}
        backgroundStyle={{backgroundColor: colors.modalBackground}}
        onChange={e => {}}>
        <View
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <View style={styles.userphoto}>
            <Image
              source={item.isMafia ? mafiarole : citizenrole}
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <Text style={{color: colors.text}}>{item.title}</Text>
          <Text>{item.description}</Text>
        </View>
      </Modal>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  userphoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
export {RoleRow};

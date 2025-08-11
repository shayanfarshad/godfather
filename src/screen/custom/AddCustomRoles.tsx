/**
 * @format
 * @flow strict-local
 */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import {colors, spacing} from '../../theme';
import Header from '../../components/Header';
import Text from '../../components/Text';
import {RoleRow} from './RoleRow';
import {DHeight, hp} from '../../constants/Constants';
import I18n from 'i18n-js';
import {Icon} from '../../components/Icon';
import {BottomSheetModal, BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {Modal} from '../../components/Modal';
import mafiarole from '../../assets/images/mafiarole.png';
import citizenrole from '../../assets/images/citizenrole.png';
import Toggle from '../../components/Toggle';
import {showToast} from '../../utils/snackbar';
import * as storage from '../../utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {t} from 'i18next';
import {useAppSelector} from '../../stores/hooks';
import {shallowEqual} from 'react-redux';

const AddCustomRoles = () => {
  const nav = useNavigation();
  const colorScheme = useColorScheme() === 'dark';
  const addRef = useRef<BottomSheetModal>(null);
  const language = useAppSelector(state => state.App.language, shallowEqual);
  const [customRoles, setCustomRoles] = useState<any>([]);
  const [roleName, setRoleName] = useState('');
  const [roleDes, setRoleDes] = useState('');
  const [roleType, setRoleType] = useState(true);
  const [hasShield, setHasShield] = useState(false);

  const getCustomRoles = async () => {
    return await storage.load('customRoles');
  };
  useEffect(() => {
    getCustomRoles().then(customRole => {
      if (customRole) {
        setCustomRoles(customRole);
      }
    });
  }, []);

  const addNewRole = () => {
    if (roleName) {
      addRef?.current?.close();
      const arr = [...customRoles];
      arr.push({
        id: Date.now(),
        title: roleName,
        description: roleDes,
        image: roleType ? mafiarole : citizenrole,
        active: true,
        shield: hasShield,
        side: roleType ? 'mafia' : 'citizen',
      });
      storage.save('customRoles', arr);
      setCustomRoles(arr);
      showToast({
        text: t('custom.newRoleAdded', {
          role: roleName,
        }),
      });
      setRoleName('');
      setRoleDes('');
    } else {
      showToast({
        text: t('custom.shouldWriteRoleName'),
        mode: 'danger',
      });
    }
  };

  const removeItem = (id: number) => {
    const arr = [...customRoles];
    const filteredArr = arr.filter(item => item.id !== id);
    AsyncStorage.setItem('customRoles', JSON.stringify(filteredArr));
    setCustomRoles(filteredArr);
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.background,paddingTop:hp(2)}}>
      <Header title={t('custom.title')} />
      {customRoles ? (
        <FlatList
          data={customRoles}
          keyExtractor={item => item.id}
          style={{flex: 0.6, maxHeight: DHeight * 0.7}}
          contentContainerStyle={{
            marginTop: 20,
            paddingBottom: 50,
            // marginBottom: 40,
          }}
          ListEmptyComponent={() => {
            return (
              <View style={styles.emptyList}>
                <Image
                  source={require('../../assets/images/empty1.png')}
                  style={{width: '50%', height: 200}}
                />
                <Text style={{fontSize: 20}}>
                  {t('custom.anyRoleDoesentAdded')}
                </Text>
              </View>
            );
          }}
          renderItem={({item}) => {
            return (
              <RoleRow
                item={item}
                key={item?.id}
                removeItem={() => removeItem(item.id)}
              />
            );
          }}
        />
      ) : null}
      <View
        style={[
          styles.addBtn,
          {
            backgroundColor: !colorScheme
              ? colors.modalBackground
              : colors.bottomCenterColor,
          },
        ]}>
        <Pressable
          onPress={() => {
            addRef?.current?.present();
          }}
          style={styles.addBtnIcon}>
          <Icon name="user-plus" size={20} color={colors.text} />
        </Pressable>
      </View>
      <Modal
        modalRef={addRef}
        index={0}
        onDismiss={() => {}}
        snapPoints={[DHeight * 0.8]}
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
              source={roleType ? mafiarole : citizenrole}
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <Toggle
            label={roleType ? t('custom.mafia') : t('custom.citizen')}
            onToggle={() => setRoleType(!roleType)}
            initialValue={roleType}
          />
          <Toggle
            label={hasShield ? t('custom.hasShield') : t('custom.notHasShield')}
            onToggle={() => setHasShield(!hasShield)}
            initialValue={hasShield}
          />

          <BottomSheetTextInput
            value={roleName}
            onChangeText={text => {
              setRoleName(text);
            }}
            style={[
              styles.modalInput,
              {
                backgroundColor: colors.background,
                color: colors.text,
                fontSize: language === 'fa' ? spacing.md : 14,
                fontFamily:
                  language === 'fa' ? 'IRANSansXNoEn-Medium' : 'Wizard World',
              },
            ]}
            selectionColor={colors.text}
            placeholder={t('custom.roleName')}
            placeholderTextColor={colors.textDim}
          />
          <BottomSheetTextInput
            value={roleDes}
            onChangeText={text => {
              setRoleDes(text);
            }}
            numberOfLines={5}
            style={[
              styles.modalInput,
              {
                backgroundColor: colors.background,
                color: colors.text,
                height: 120,
                textAlignVertical: 'top',
                fontSize: language === 'fa' ? spacing.md : 14,
                fontFamily:
                  language === 'fa' ? 'IRANSansXNoEn-Medium' : 'Wizard World',
              },
            ]}
            selectionColor={colors.text}
            placeholder={t('custom.roleDes')}
            placeholderTextColor={colors.textDim}
          />
          <Pressable
            onPress={() => {
              addNewRole();
            }}
            style={[
              styles.modalBtn,
              {
                backgroundColor: colors.background,
              },
            ]}>
            <Text>{t('common.addBtn')}</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  addBtn: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 120,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    backgroundColor: 'white',
  },
  addBtnIcon: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userphoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  modalInput: {
    width: '90%',
    height: 60,
    // paddingTop: 10,
    paddingHorizontal: 5,
    borderRadius: 8,
    textAlign: I18n.locale === 'en-IR' ? 'right' : 'left',
    textAlignVertical: 'center',
    color: colors.text,
    fontSize: 20,
    backgroundColor: colors.inputBackground,
    // fontFamily: 'IRANSansXNoEn-Medium',
  },
  modalBtn: {
    width: '90%',
    height: 50,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  addPhotoCard: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 15,
    borderColor: 'white',
  },
  selectImageContainer: {
    flexDirection: 'row-reverse',
    height: '100%',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  addImageBtnCard: {justifyContent: 'center', alignItems: 'center'},
  emptyList: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    // marginTop: 80,
  },
});
export {AddCustomRoles};

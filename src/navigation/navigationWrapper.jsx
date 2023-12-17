/**
 * @format
 * @flow strict-local
 */

import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {BackHandler, Alert, Pressable, View, StyleSheet} from 'react-native';
import {Modal} from '../components/Modal';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {backgroundColor} from '../constants/Constants';
import Text from '../components/Text';
import {colors} from '../theme';
import {translate} from '../i18n';

const NavigationWrapper = ({children}) => {
  const [isBackHandled, setIsBackHandled] = useState(false);
  const nav = useNavigation();
  const exitRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove();
  }, []);

  const handleBackPress = () => {
    if (!isBackHandled) {
      setIsBackHandled(true);
      if (nav.canGoBack() === false) {
        exitRef?.current?.present();

        return true;
      }

      nav.goBack();
      // Your custom navigation logic here (e.g., show a confirmation dialog, go back to the previous screen, etc.)
      // Example:

      return true;
    }

    return false;
  };

  return (
    // Pass the children components and navigation prop to the wrapper
    <>
      {children}
      <Modal
        modalRef={exitRef}
        index={0}
        onDismiss={() => exitRef?.current?.close()}
        snapPoints={['30%']}
        backgroundStyle={{
          backgroundColor: colors.cardBackground,
        }}>
        <View style={styles.selectImageContainer}>
          <View>
            <Text style={{fontSize: 20}}>
              {translate('game.doYouWantToCloseApp')}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '80%',
              justifyContent: 'space-around',
            }}>
            <Pressable
              onPress={() => {
                BackHandler.exitApp();
              }}
              style={[
                styles.addImageBtnCard,
                {
                  backgroundColor: colors.background,
                },
              ]}>
              <Text>{translate('common.ok')}</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setIsBackHandled(false);
                exitRef?.current?.close();
              }}
              style={[
                styles.addImageBtnCard,
                {
                  backgroundColor: colors.background,
                },
              ]}>
              <Text>{translate('common.cancel')}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  selectImageContainer: {
    flexDirection: 'column',
    height: '80%',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  addImageBtnCard: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 80,
    height: 40,
  },
});

export default NavigationWrapper;

/* eslint-disable react/jsx-props-no-spreading */
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, {useCallback} from 'react';
import {Platform, Pressable, StyleSheet, View} from 'react-native';
import {Icon} from './Icon';
import {DWidth} from '../constants/Constants';

const Modal = ({
  modalRef,
  onDismiss,
  snapPoints,
  onChange,
  children,
  onBackdropPress,
  index = 0,
  disappearsOnIndex = -1,
  appearsOnIndex = 0,
  vertical,
  backgroundStyle = {},
}) => {
  const renderBackdrop = useCallback(
    props => (
      <View>
        <BottomSheetBackdrop
          onPress={() => {
            console.log('back drop call');
            // console.log('back drop ');
          }}
          {...props}
          disappearsOnIndex={disappearsOnIndex}
          appearsOnIndex={appearsOnIndex}
          opacity={0.5}
          pressBehavior={'close'}
          animatedIndex={{value: 0}}
        />
      </View>
    ),
    [],
  );
  return (
    <BottomSheetModal
      enablePanDownToClose
      ref={modalRef}
      index={index}
      backdropComponent={renderBackdrop}
      keyboardBehavior="extend"
      keyboardBlurBehavior="restore"
      stackBehavior="replace"
      // android_keyboardInputMode='adjustPan'
      onDismiss={onDismiss}
      style={styles.shadow}
      handleStyle={styles.handle}
      snapPoints={snapPoints}
      onChange={onChange}
      backgroundStyle={[
        {
          width: '100%',
        },
        backgroundStyle,
      ]}>
      <BottomSheetView
        style={[styles.contentContainer, {paddingVertical: vertical || 0}]}>
        {Platform.OS === 'web' && (
          <Pressable
            style={{
              alignSelf: 'flex-end',
              width: 50,
              height: 50,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => modalRef.current.close()}>
            <Icon name="times" size={25} />
          </Pressable>
        )}
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    // marginLeft: DWidth / 4,
    paddingHorizontal: 15,
    paddingBottom: 30,
    marginBottom: Platform.OS === 'web' ? 70 : 0,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 10,
  },
  handle: {
    height: 0,
    display: 'none',
  },
});

export {Modal};

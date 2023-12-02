/* eslint-disable react/jsx-props-no-spreading */
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';

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
      <BottomSheetBackdrop
        onPress={() => {
          // console.log('back drop ');
        }}
        {...props}
        disappearsOnIndex={disappearsOnIndex}
        appearsOnIndex={appearsOnIndex}
        opacity={0.5}
        animatedIndex={{value: 0}}
      />
    ),
    [],
  );
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        enablePanDownToClose
        ref={modalRef}
        index={index}
        backdropComponent={renderBackdrop}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        stackBehavior="replace"
        // android_keyboardInputMode='adjustPan'
        onDismiss={onDismiss}
        style={styles.shadow}
        handleStyle={styles.handle}
        snapPoints={snapPoints}
        onChange={onChange}
        backgroundStyle={backgroundStyle}>
        <BottomSheetView
          style={[styles.contentContainer, {paddingVertical: vertical || 0}]}>
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
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

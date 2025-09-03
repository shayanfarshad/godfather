/* eslint-disable react/jsx-props-no-spreading */
import {
    BottomSheetBackdrop,
    BottomSheetView,
    BottomSheetModal,
} from '@gorhom/bottom-sheet';
import React, { useCallback, ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

// Define types for the props
interface ModalProps {
    modalRef: React.RefObject<BottomSheetModal>;
    onDismiss?: () => void;
    snapPoints: (string | number)[];
    onChange?: (index: number) => void;
    children: ReactNode;
    onBackdropPress?: () => void;
    index?: number;
    disappearsOnIndex?: number;
    appearsOnIndex?: number;
    vertical?: number;
    backgroundStyle?: ViewStyle;
}

const Modal: React.FC<ModalProps> = ({
    modalRef,
    onDismiss,
    snapPoints,
    onChange,
    children,
    index = 0,
    disappearsOnIndex = -1,
    appearsOnIndex = 0,
    vertical = 0,
    backgroundStyle = {},
}: ModalProps) => {
    // Use callback to memoize the backdrop component
    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={disappearsOnIndex}
                appearsOnIndex={appearsOnIndex}
                opacity={0.5}
                animatedIndex={{ value: 0 }}
                onPress={props.onPress}
            />
        ),
        [disappearsOnIndex, appearsOnIndex],
    );

    return (
        <BottomSheetModal
            enablePanDownToClose
            ref={modalRef}
            index={index}
            backdropComponent={renderBackdrop}
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"
            stackBehavior="replace"
            onDismiss={onDismiss}
            style={styles.shadow}
            handleStyle={styles.handle}
            snapPoints={snapPoints}
            onChange={onChange}
            backgroundStyle={backgroundStyle}>
            <BottomSheetView
                style={[styles.contentContainer, { paddingVertical: vertical }]}>
                {children}
            </BottomSheetView>
        </BottomSheetModal>
    );
};

// Define styles for the modal
const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingHorizontal: 15,
        paddingBottom: 30,
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

export { Modal };
import React, { useEffect } from 'react';
import {
    Platform,
    Pressable,
    StyleSheet,
    View,
    ViewStyle,
    useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Text from './Text';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from 'src/app/store';
import { useTheme } from 'src/app/theme';
import { hp } from 'src/app/theme/tokens';

interface headerProps {
    title: string;
    backPress?: () => void;
    headerFontSize?: number | undefined;
    headerStyle?: ViewStyle;
    titleViewStyle?: ViewStyle;
}

const Header = ({
    title,
    backPress,
    headerFontSize,
    headerStyle,
    titleViewStyle,
}: headerProps) => {
    const language = useAppSelector(state => state.Settings.lang, shallowEqual);

    const { colors } = useTheme();

    return (
        <View
            style={[
                headerStyle,
                styles.header,
                {
                    backgroundColor:  colors.bg ,
                    justifyContent: !backPress ? 'center' : 'space-between',
                },
            ]}>
            <View
                style={[
                    titleViewStyle,
                    styles.titleView,
                    {
                        width: backPress ? '90%' : '100%',
                        justifyContent: language === "fa" ? 'flex-end' : 'flex-start',
                    },
                ]}>
                <Text
                    style={{
                        fontSize: headerFontSize || hp(3),
                        color: colors.text,
                    }}>
                    {'  '}
                    {title}
                    {'  '}
                </Text>
            </View>
            {backPress && (
                <View
                    style={{
                        width: '10%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Pressable
                        style={{
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={backPress}>
                        <Icon name={'chevron-left'} size={hp(2)} color={colors.text} />
                    </Pressable>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row-reverse',
        height: hp(6),
        marginTop: Platform.OS === 'ios' ? hp(5) : 20,
        marginBottom: hp(1),
        width: '100%',
        justifyContent: 'center',
        // paddingHorizontal: 15,
        alignItems: 'center',
    },
    titleView: {
        // justifyContent: 'flex-start',
        flexDirection: 'row',
    },
});

export default Header;
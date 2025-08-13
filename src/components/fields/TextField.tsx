import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps, Pressable } from 'react-native';
import { useTheme } from 'src/app/theme';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
type Props = {
    label?: string;
    error?: string;
    secureToggle?: boolean;
} & TextInputProps;

export default function TextField({ label, error, secureTextEntry, secureToggle, style, ...rest }: Props) {
    const { colors } = useTheme();
    const [secure, setSecure] = useState(!!secureTextEntry);

    return (
        <View style={{ marginBottom: 12 }}>
            {label ? <Text style={[styles.label, { color: colors.subtext }]}>{label}</Text> : null}
            <View style={[
                styles.inputWrap,
                { borderColor: error ? colors.danger : colors.border, backgroundColor: colors.surface }
            ]}>
                <TextInput
                    placeholderTextColor={colors.subtext}
                    style={[styles.input, { color: colors.text }, style]}
                    secureTextEntry={secure}
                    {...rest}
                />
                {secureToggle ? (
                    <Pressable onPress={() => setSecure(s => !s)} hitSlop={8} style={{ paddingHorizontal: 8 }}>
                        {secure ? <FontAwesome5 name='eye' size={18} color={colors.subtext} /> : <FontAwesome5 name="eye-slash" size={18} color={colors.subtext} />}
                    </Pressable>
                ) : null}
            </View>
            {!!error && <Text style={[styles.error, { color: colors.danger }]}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    label: { fontSize: 13, marginBottom: 6, fontWeight: '600' },
    inputWrap: { borderWidth: 1, borderRadius: 12, height: 48, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 },
    input: { flex: 1, fontSize: 15 },
    error: { marginTop: 6, fontSize: 12 }
});

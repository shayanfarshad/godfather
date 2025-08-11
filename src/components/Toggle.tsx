import React, {useState, useRef} from 'react';
import {View, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import Text from './Text';
import {colors} from '../theme';

const Toggle = ({label, onToggle, initialValue = false}) => {
  const [isEnabled, setIsEnabled] = useState(initialValue);
  const translateXAnim = useRef(
    new Animated.Value(initialValue ? 1 : 0),
  ).current;

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    onToggle(!isEnabled);
    Animated.timing(translateXAnim, {
      toValue: isEnabled ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const toggleBackgroundColor = isEnabled
    ? colors.cardBackground
    : colors.background;

  const translateX = translateXAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0], // Adjust the value here to change the toggle's movement
  });

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={toggleSwitch}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: toggleBackgroundColor,
            flexDirection: isEnabled ? 'row-reverse' : 'row',
          },
        ]}>
        <Text style={styles.label} numberOfLines={undefined}>
          {label}
        </Text>
        <Animated.View
          style={[styles.toggleCircle, {transform: [{translateX}]}]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    elevation:10
  },
  label: {
    color: colors.text,
    marginHorizontal: 8,
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.modalBackground,
  },
});

export default Toggle;

import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Text from './Text';

export const Radio = ({label, onPress, selected}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.radioButton}>
      <View
        style={[
          styles.radioOuterCircle,
          selected && styles.radioOuterCircleSelected,
        ]}>
        {selected && <View style={styles.radioInnerCircle} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginVertical: 8,
  },
  radioOuterCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  radioOuterCircleSelected: {
    borderColor: 'blue', // Change the color when selected
  },
  radioInnerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: 'blue', // Change the color when selected
  },
  radioLabel: {
    fontSize: 14,
  },
});

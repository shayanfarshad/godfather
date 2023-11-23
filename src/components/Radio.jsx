import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const Radio = ({ label, onPress, selected }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.radioButton}>
      <View style={[styles.radioOuterCircle, selected && styles.radioOuterCircleSelected]}>
        {selected && <View style={styles.radioInnerCircle} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    radioButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
    },
    radioOuterCircle: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
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
      fontSize: 16,
    },
  });
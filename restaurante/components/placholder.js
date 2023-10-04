import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../colors';

export const Placeholder = () => {
  return (
    <View style={styles.placeholderContainer}>
      <View style={styles.placeholderImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  placeholderContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    height:100,
    width:100,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1, // Para mantener el aspecto cuadrado del placeholder
  },
  placeholderImage: {
    backgroundColor: Colors.lightGray,
    width: '100%',
    height: '80%',
  },
});

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../colors';

const SubmenuButton = ({ title, onPress, isActive,styleObj }) => {
  const buttonStyle = isActive ? [styles.activeButton] : styles.button;
  const textStyle = isActive ? styles.activeButtonText : styles.buttonText;

  return (
    <TouchableOpacity style={[buttonStyle,styleObj]} onPress={onPress} activeOpacity={0.6}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  buttonText: {
    color: Colors.colorText,
  },
  activeButton: {
    padding: 10,
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButtonText: {
    color: Colors.colorText,
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default SubmenuButton;

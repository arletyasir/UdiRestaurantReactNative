import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export  const LineOr=()=> {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>or</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft:'13%',
    paddingRight:'13%',
    justifyContent: 'center',
    marginTop:12
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#A9A9A9',
  },
  text: {
    textAlign: 'center',
    marginLeft: 10,
    color:'#A9A9A9',
    marginRight: 10,
  },
});

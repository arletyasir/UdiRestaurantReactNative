import React,{useEffect,useRef} from 'react';
import { View, StyleSheet,Animated } from 'react-native';
import { Colors } from '../colors/index';

export const TitleText = ({title1,size,colorParam,textShadowColorParam}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scale1 = useRef(new Animated.Value(5)).current;
  useEffect(()=>{
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
    Animated.timing(scale1, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true
    }).start();
  })
  return (
    <View style={styles.contenedor}>
      <Animated.Text style={[styles.texto,{fontSize: size,fontWeight:'bold',textShadowColor:textShadowColorParam,color:colorParam,opacity:fadeAnim,transform:[{scale:scale1}]}]}>{title1}</Animated.Text>
      <Animated.Text style={[styles.texto,{fontSize: 20,fontWeight:'bold',textShadowColor:textShadowColorParam,color:colorParam,opacity:fadeAnim,transform:[{scale:scale1}]}]}>by DOSSIER</Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    fontWeight: 'bold',
    color: Colors.secondary,
    textShadowColor:Colors.primary,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },

});

